const Movie = require('../models/movie');

exports.createMovie = async (movieData) => {
  try {
    const movie = new Movie(movieData);
    await movie.save();
    return movie;
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getMovies = async () => {
  try {
    const movies = await Movie.find();
    return movies;
  } catch (err) {
    throw new Error('Erro ao buscar filmes: ' + err.message);
  }
};

exports.getMovieById = async (movieId) => {
  try {
    const movie = await Movie.findById(movieId).populate('sessions');
    if (!movie) {
      throw new Error('Filme não encontrado');
    }
    return movie;
  } catch (err) {
    throw new Error('Erro ao buscar filme: ' + err.message);
  }
};

exports.updateMovie = async (movieId, movieData) => {
  try {
    const movie = await Movie.findByIdAndUpdate(movieId, movieData, { new: true });
    if (!movie) {
      throw new Error('Filme não encontrado');
    }
    return movie;
  } catch (err) {
    throw new Error('Erro ao atualizar filme: ' + err.message);
  }
};

exports.deleteMovie = async (movieId) => {
  try {
    const movie = await Movie.findByIdAndDelete(movieId);
    if (!movie) {
      throw new Error('Filme não encontrado');
    }
    return movie;
  } catch (err) {
    throw new Error('Erro ao excluir filme: ' + err.message);
  }
};