const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();


// Add movie to favorite list


exports.addFavoriteMovie = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT middleware
    const { movie } = req.body;
    const { backdrop_path, id, original_language, video, vote_count, ...storeMovie } = movie;

    if (!id) {
      return res.status(400).json({ message: "Movie ID required" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { favoriteMovies: storeMovie },
      },
      { new: true }
    );

    res.json(user.favoriteMovies);
  } catch (err) {
    res.status(500).json({ message: "Failed to add favorite movie" });
  }
};


exports.getFavoriteMovies = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT middleware
    const user = await User.findById(userId);
    

    if (!user) {
        res.status(404).json({
            success: false,
            message: "User is not authorized"
        });
    }

    res.json({
        success: true,
        message: "User favorite movies pushed",
        movies: user.favoriteMovies
    });

  } catch (err) {
    res.status(500).json({ message: "Failed to get favorite movies" });
  }
};

exports.removeFavoriteMovie = async (req, res) => {
  try {
    const userId = req.user.id;
    const { movieId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { favoriteMovies: movieId },
      },
      { new: true }
    );

    res.json(user.favoriteMovies);
  } catch (err) {
    res.status(500).json({ message: "Failed to remove favorite movie" });
  }
};

