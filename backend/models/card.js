const { Schema, model } = require('mongoose');
const isURL = require('validator/lib/isURL');

const cardSchema = new Schema({
  name: {
    type: String,
    minlength: [2, 'Слишком короткое название'],
    maxlength: [30, 'Слишком длинное название'],
    required: [true, 'Обязательное поле'],
  },
  link: {
    type: String,
    required: [true, 'Обязательное поле'],
    validate: {
      validator: (value) => isURL(value),
      message: (props) => `${props.value} невалидный!`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
});

module.exports = model('card', cardSchema);
