const router = require('express').Router();
const { celebrate } = require('celebrate');

const cardRouter = require('./cards');
const userRouter = require('./users');
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../errors/NotFoundError');

const { login } = require('../controllers/users');
const { createUsers } = require('../controllers/users');

const { userDataValidationLogin } = require('../validation/validationRules');
const { userDataValidationCreate } = require('../validation/validationRules');

router.post('/signup', celebrate(userDataValidationCreate), createUsers);
router.post('/signin', celebrate(userDataValidationLogin), login);
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

module.exports = { router };
