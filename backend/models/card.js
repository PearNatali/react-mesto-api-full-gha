const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Field "name" should not be empty'],
    minlength: [2, 'Min length of "name" field - 2'],
    maxlength: [30, 'Max length of "name" field - 30'],
  },
  link: {
    type: String,
    required: [true, 'Field "name" should not be empty'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Field "name" should not be empty'],
    ref: 'user',
  },
  likes: [{
    default: [],
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
