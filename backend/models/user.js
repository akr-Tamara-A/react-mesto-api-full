const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const isURL = require('validator/lib/isURL');

const BadRequestError = require('../errors/BadRequestError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Слишком короткое название'],
    maxlength: [30, 'Слишком длинное название'],
    required: false,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Слишком короткое название'],
    maxlength: [30, 'Слишком длинное название'],
    required: false,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: false,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (value) => isURL(value),
      message: (props) => `${props.value} невалидный!`,
    },
  },
  email: {
    type: String,
    required: [true, 'Обязательное поле'],
    index: true,
    unique: 'Такой email уже используется',
    validate: {
      validator: (value) => isEmail(value),
      message: () => 'Email невалидный!',
    },
  },
  password: {
    type: String,
    required: [true, 'Обязательное поле'],
    select: false,
  },
});

userSchema.plugin(require('mongoose-beautiful-unique-validation'));

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new BadRequestError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new BadRequestError('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
