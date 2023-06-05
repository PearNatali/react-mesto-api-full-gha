const router = require('express').Router();
const { celebrate } = require('celebrate');

const { login } = require('../controllers/users');
const { userDataValidationLogin } = require('../validation/validationRules');

router.post('/', celebrate(userDataValidationLogin), login);

module.exports = router;
