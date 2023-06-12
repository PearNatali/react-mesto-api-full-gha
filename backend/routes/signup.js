const router = require('express').Router();
const { celebrate } = require('celebrate');

const { createUsers } = require('../controllers/users');
const { userDataValidationCreate } = require('../validation/validationRules');

router.post('/', celebrate(userDataValidationCreate), createUsers);

module.exports = router;
