const router = require('express').Router();
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../errors');
const { logout } = require('../controllers/Users');

router.use(require('./auth'));

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.post('/signout', logout);

router.use('*', (_, res, next) => next(new NotFoundError()));

module.exports = router;
