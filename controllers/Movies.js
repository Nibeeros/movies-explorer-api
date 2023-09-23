const mongoose = require('mongoose');
const Movie = require('../models/movie');
const {
  CREATED, deletingRestrictedMsg, noSuchMovieIdMsg, incorrectDataMsg,
} = require('../constants/constants');
const NotFoundError = require('../errors/NotFoundError');
const RestrictedError = require('../errors/RestrictedError');
const BadRequestError = require('../errors/BadRequestError');

// Returns all movies saved by current user
module.exports.getSavedMovies = (req, res, next) => {
  const userId = req.user._id;

  Movie.find({ owner: userId })
    .then((movies) => {
      res.send({ data: movies });
    })
    .catch(next);
};

// Creates movie with params passed in body:
module.exports.addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.status(CREATED).send({ data: movie }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(incorrectDataMsg));
      }
      next(err);
    });
};

// Removes saved movie by id
module.exports.removeMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (movie && (movie.owner.toString() === req.user._id)) {
        return Movie.findByIdAndRemove(movie._id);
      }
      if (movie && (movie.owner.toString() !== req.user._id)) {
        throw new RestrictedError(deletingRestrictedMsg);
      }
      throw new NotFoundError(noSuchMovieIdMsg);
    })
    .then((mov) => res.send({ data: mov }))
    .catch(next);
};
