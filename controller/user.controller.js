const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Generate json web token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '2h' });
}

exports.register = async  (req, res) => {
    try {
        const {username, email, password} = req.body;

        if (email.trim() === '' || password.trim() === '' || username.trim() === '') {
            res.status(400).json({
                success: false,
                message: 'Email, Username and Password required !'
            });
        }
        

        //Check if user already exists
        const existsUser = await User.findOne({ $or: [ { email}, { username }]})
        if (existsUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        

        // Hash password
        const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT_ROUNDS) || 10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({ username, email, password: hashedPassword });
        
        await user.save();
        const token = generateToken(user._id);
        
        res.status(201).json({message: 'User created', token, user: { id: user._id, name: user.name, email: user.email }});
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }

}

// Login user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // find user
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password '});
        }

        const token = generateToken(user._id);
        res.status(200).json({ message: 'Login successful', token, user: { id: user._id, name: user.username, email: user.email }});
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server error'});
    }
}

// Get Profile
exports.getProfile = async (req, res) => {
    try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication token is required' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user by ID
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    
    // Return user info without password
    const { password, ...userWithoutPassword } = user;
    res.json({ message: 'User profile retrieved', user: userWithoutPassword });
    } catch (error) {
        console.error('Profile error:', error);
        if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token has expired' });
        }
        
        res.status(500).json({ message: 'Server error' });
    }
}

// Verify token (for other services)
exports.verifyToken = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ valid: false, message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(404).json({ valid: false, message: 'User not found' });
        }
        res.status(200).json({ valid: true, user });
    } catch (error) {
        res.status(401).json({ valid: false, message: 'Invalid token' });
    }
}