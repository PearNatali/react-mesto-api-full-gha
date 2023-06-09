const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getCards,
  createCard,
  deleteCard,
  getLike,
  deleteLike,
} = require('../controllers/cards');
const {
  cardDataValidationObject,
  cardIdValidationObject,
} = require('../validation/validationRules');

router.get('/', getCards);
router.post('/', celebrate(cardDataValidationObject), createCard);
router.delete('/:_id', celebrate(cardIdValidationObject), deleteCard);
router.put('/:_id/likes', celebrate(cardIdValidationObject), getLike);
router.delete('/:_id/likes', celebrate(cardIdValidationObject), deleteLike);

module.exports = router;
