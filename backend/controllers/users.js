const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { getUserDto } = require('../dto/user');

const { NotFoundError } = require('../errors/NotFoundError');
const { BadRequestError } = require('../errors/BadRequestError');
const { ConflictError } = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = require('../app.config');

const isValidId = (id) => mongoose.isValidObjectId(id);

const createUsers = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send(getUserDto(user)))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('User with this email already exist'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.status(200).send({ token });
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { _id } = req.params;

  if (!isValidId(_id)) {
    next(new BadRequestError('Invalid card Id'));
    return;
  }

  User.findById(_id)
    .orFail(new NotFoundError('User not found'))
    .then((user) => res.send(getUserDto(user)))
    .catch((next));
};

const getCurrentUser = (req, res, next) => {
  const { _id } = req.body;

  User.findById(_id)
    .orFail(new NotFoundError('User not found'))
    .then((user) => res.send(getUserDto(user)))
    .catch((next));
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .orFail(new NotFoundError('User not found'))
    .then((user) => res.send(getUserDto(user)))
    .catch((next));
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .orFail(new NotFoundError('User not found'))
    .then((user) => res.send(getUserDto(user)))
    .catch((next));
};

module.exports = {
  updateAvatar,
  updateProfile,
  getCurrentUser,
  getUserById,
  getUsers,
  login,
  createUsers,
};
