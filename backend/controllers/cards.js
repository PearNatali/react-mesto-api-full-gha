const mongoose = require('mongoose');
const Card = require('../models/card');
const { getCardDto } = require('../dto/card');

const { NotFoundError } = require('../errors/NotFoundError');
const { AccessDeniedError } = require('../errors/AccessDeniedError');
const { BadRequestError } = require('../errors/BadRequestError');

const isValidId = (id) => mongoose.isValidObjectId(id);

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch((next));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id: userId } = req.user;

  Card.create({ name, link, owner: userId })
    .then((card) => card.populate(['owner']))
    .then((card) => res.status(201).send(getCardDto(card)))
    .catch((next));
};

const deleteCard = (req, res, next) => {
  const { _id: cardId } = req.params;
  const { _id: userId } = req.user;

  if (!isValidId(cardId)) {
    next(new BadRequestError('Invalid card Id'));
    return;
  }

  Card.findById(cardId)
    .orFail(new NotFoundError('Card not found'))
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card.owner._id.toString() !== userId) {
        throw new AccessDeniedError('Not enough rights to delete card');
      }
      return card.deleteOne();
    })
    .then((card) => res.send(getCardDto(card)))
    .catch((next));
};

const getLike = (req, res, next) => {
  const { _id: cardId } = req.params;
  const { _id: userId } = req.user;

  if (!isValidId(cardId)) {
    next(new BadRequestError('Invalid card Id'));
    return;
  }

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .orFail(new NotFoundError('Card not found'))
    .populate(['owner', 'likes'])
    .then((card) => res.send(getCardDto(card)))
    .catch((next));
};

const deleteLike = (req, res, next) => {
  const { _id: cardId } = req.params;
  const { _id: userId } = req.user;

  if (!isValidId(cardId)) {
    next(new BadRequestError('Invalid card Id'));
    return;
  }

  Card.findByIdAndUpdate(cardId, { $pull: { likes: { $in: [userId] } } }, { new: true })
    .orFail(new NotFoundError('Card not found'))
    .populate(['owner', 'likes'])
    .then((card) => res.send(getCardDto(card)))
    .catch((next));
};

module.exports = {
  getCards,
  deleteLike,
  getLike,
  deleteCard,
  createCard,
};
