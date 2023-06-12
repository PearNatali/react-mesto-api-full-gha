const router = require('express').Router();
const { celebrate } = require('celebrate');

const { NotFoundError } = require('../errors/NotFoundError');
const { createUsers } = require('../controllers/users');
const { login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const cardsRouter = require('./cards');

const { userDataValidationCreate } = require('../validation/validationRules');
const { userDataValidationLogin } = require('../validation/validationRules');

router.post('/signup', celebrate(userDataValidationCreate), createUsers);
router.post('/signin', celebrate(userDataValidationLogin), login);
router.use(auth);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

module.exports = router;
