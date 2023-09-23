const router = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../controllers/users');
const { userUpdateValidation } = require('../middlewares/validation');

router.get('/me', getUserInfo);
router.patch(
  '/me',
  userUpdateValidation,
  updateUserInfo,
);

module.exports = router;
