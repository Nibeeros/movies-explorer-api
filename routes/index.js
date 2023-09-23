const router = require('express').Router();
const { signupValidation, signinValidation } = require('../middlewares/validation');
const auth = require('../middlewares/auth');
const { createUser, loginUser, logoutUser } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const { noSuchRouteMsg } = require('../constants/constants');

router.post(
  '/signup',
  signupValidation,
  createUser,
);
router.post(
  '/signin',
  signinValidation,
  loginUser,
);
router.post('/signout', auth, logoutUser);

router.use('/users', auth, require('./users'));
router.use('/movies', auth, require('./movies'));

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError(noSuchRouteMsg));
});

module.exports = router;
