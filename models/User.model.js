const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const userSchema = mongoose.Schema({
    username: {
        type: String,
        minlength: [2, 'username should be at least 2 characters'],
        maxlength: [50, 'username should be less than 50 characters'],
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength:[6, 'Password must be at least 6 characters long']
    },
    favoriteMoview: [
        {
            type: String,
            
        }
    ]
}, { timestamps: true});

// userSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) {
//         return next();
//     }

//     const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
//     this.password = await bcrypt.hash(this.password, saltRounds);
//     next();
// });

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model('User', userSchema);