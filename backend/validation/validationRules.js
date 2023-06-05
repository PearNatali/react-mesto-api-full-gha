const { Joi } = require('celebrate');

const regexLink = /^https?:\/\/(wwww\.)?[0-9a-zA-Z-._~:/?#[\]@!$&'()*+,;=]+#?/;

const cardDataValidationObject = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regexLink),
  }),
};

const cardIdValidationObject = {
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
};

const userDataValidationObject = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
};

const userIdValidationObject = {
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
};

const userAvatarValidationObject = {
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(regexLink),
  }),
};

const userDataValidationLogin = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

const userDataValidationCreate = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regexLink),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

module.exports = {
  userDataValidationCreate,
  userDataValidationLogin,
  userAvatarValidationObject,
  userIdValidationObject,
  userDataValidationObject,
  cardIdValidationObject,
  cardDataValidationObject,
};
