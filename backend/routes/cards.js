const cardsRouter = require('express').Router();
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

cardsRouter.get('/', getCards);
cardsRouter.post('/', celebrate(cardDataValidationObject), createCard);
cardsRouter.delete('/:_id', celebrate(cardIdValidationObject), deleteCard);
cardsRouter.put('/:_id/likes', celebrate(cardIdValidationObject), getLike);
cardsRouter.delete('/:_id/likes', celebrate(cardIdValidationObject), deleteLike);

module.exports = cardsRouter;
