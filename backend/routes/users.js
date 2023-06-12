const userRouter = require('express').Router();
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

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:_id', celebrate(userIdValidationObject), getUserById);
userRouter.patch('/me', celebrate(userDataValidationObject), updateProfile);
userRouter.patch('/me/avatar', celebrate(userAvatarValidationObject), updateAvatar);

module.exports = userRouter;
