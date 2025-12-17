const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// create favorite movies sub-schema
const favoriteMovieSchema = mongoose.Schema({
    movieId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    poster_path: {
        type: String
    },
    overview: {
        type: String
    },
    adult: {
        type: Boolean,
        default: false
    },
    vote_average: {
        type: Number
    },
    release_date: {
        type: String
    }
}, { _id : false });


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
    favoriteMovies: [
        favoriteMovieSchema
    ]
}, { timestamps: true});


// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model('User', userSchema);