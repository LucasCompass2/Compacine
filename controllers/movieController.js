const movieService = require('../services/movieService');

exports.getMovies = async (req, res) => {
  try {
    const movies = await movieService.getMovies();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMovieById = async (req, res) => {
  const movieId = req.params.id;
  try {
    const movie = await movieService.getMovieById(movieId);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createMovie = async (req, res) => {
  const movieData = req.body;
  try {
    const newMovie = await movieService.createMovie(movieData);
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMovie = async (req, res) => {
  const movieId = req.params.id;
  const movieData = req.body;
  try {
    const updatedMovie = await movieService.updateMovie(movieId, movieData);
    res.status(200).json(updatedMovie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMovie = async (req, res) => {
  const movieId = req.params.id;
  try {
    const deletedMovie = await movieService.deleteMovie(movieId);
    res.status(200).json(deletedMovie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};