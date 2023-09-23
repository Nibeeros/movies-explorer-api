const router = require('express').Router();
const { addMovieValidation, removeMovieValidation } = require('../middlewares/validation');

const {
  getSavedMovies,
  addMovie,
  removeMovie,
} = require('../controllers/movies');

router.get('/', getSavedMovies);
router.post(
  '/',
  addMovieValidation,
  addMovie,
);
router.delete(
  '/:movieId',
  removeMovieValidation,
  removeMovie,
);

module.exports = router;
