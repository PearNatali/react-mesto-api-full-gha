const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { AuthError } = require('../errors/AuthError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Min length of "name" field - 2'],
    maxlength: [30, 'Max length of "name" field - 30'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'Min length of "name" field - 2'],
    maxlength: [30, 'Max length of "name" field - 30'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (r) => validator.isURL(r),
      message: 'Некорректный email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .orFail(new AuthError('Неправильный логин или пароль'))
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          throw new AuthError('Неправильный логин или пароль');
        }

        return user;
      }));
};

module.exports = mongoose.model('user', userSchema);
