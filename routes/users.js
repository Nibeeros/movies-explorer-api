const router = require('express').Router();
const { userUpdateValidation } = require('../middlewares/validation');
const { getUserInfo, updateUserInfo } = require('../controllers/users');

router.get('/me', getUserInfo);
router.patch(
  '/me',
  userUpdateValidation,
  updateUserInfo,
);

module.exports = router;
