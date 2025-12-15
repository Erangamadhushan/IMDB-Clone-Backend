const express = require('express');
const jwt = require('jsonwebtoken');
const movieController = require('../controller/movies.controller.js');
const validation = require('../middleware/verifyToken.js');

const router = express.Router();

// Get favorite movies
router.get('/', validation.verifyToken, movieController.getFavoriteMovies);

// Add movie to favorites
router.post('/', validation.verifyToken, movieController.addFavoriteMovie);

// Remove movie from favorites
router.delete('/:movieId', validation.verifyToken, movieController.removeFavoriteMovie);

module.exports = router;