const Movie = require('../models/movie');

exports.getMovies = async () => {
  try {
    const movies = await Movie.find();
    return movies;
  } catch (err) {
    throw new Error('Erro ao buscar filmes: ' + err.message);
  }
};

exports.createMovie = async (movieData) => {
  try {
    return await movieData.save();
  } catch (err) {
    throw new Error(err.message);
  }
};
