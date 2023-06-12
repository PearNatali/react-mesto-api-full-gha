const cardRouter = require('express').Router();
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

cardRouter.get('/', getCards);
cardRouter.post('/', celebrate(cardDataValidationObject), createCard);
cardRouter.delete('/:_id', celebrate(cardIdValidationObject), deleteCard);
cardRouter.put('/:_id/likes', celebrate(cardIdValidationObject), getLike);
cardRouter.delete('/:_id/likes', celebrate(cardIdValidationObject), deleteLike);

module.exports = cardRouter;
