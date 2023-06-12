const usersRouter = require('express').Router();
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

usersRouter.get('/', getUsers);
usersRouter.get('/me', getCurrentUser);
usersRouter.get('/:_id', celebrate(userIdValidationObject), getUserById);
usersRouter.patch('/me', celebrate(userDataValidationObject), updateProfile);
usersRouter.patch('/me/avatar', celebrate(userAvatarValidationObject), updateAvatar);

module.exports = usersRouter;
