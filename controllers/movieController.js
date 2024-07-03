const movieService = require('../services/movieService');
const Movie = require('../models/movie');

exports.getMovies = async (req, res) => {
  try {
    const movies = await movieService.getMovies();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createMovie = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newMovie = new Movie({ name, email });
    const savedMovie = await movieService.createMovie(newMovie);
    res.status(201).json(savedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
