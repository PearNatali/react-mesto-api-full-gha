const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');
const {
  userIdValidationObject,
  userDataValidationObject,
  userAvatarValidationObject,
} = require('../validation/validationRules');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:_id', celebrate(userIdValidationObject), getUserById);
router.patch('/me', celebrate(userDataValidationObject), updateProfile);
router.patch('/me/avatar', celebrate(userAvatarValidationObject), updateAvatar);

module.exports = router;
