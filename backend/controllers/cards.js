const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');
const { regIdCheck } = require('../utils/utils');

/** Контролер запроса всех карточек */
module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({}).populate('user');
    res.send(cards);
  } catch (err) {
    next(err);
  }
};

/** Контролер создания новой карточки */
module.exports.createCard = async (req, res, next) => {
  try {
    const newCard = new Card({ ...req.body, owner: req.user._id });

    const error = newCard.validateSync();
    if (error) {
      throw new BadRequestError('Невалидные данные');
    } else {
      await newCard.save();
      res.send(newCard);
    }
  } catch (err) {
    next(err);
  }
};

/** Контролер запроса одной карточки */
module.exports.getCard = async (req, res, next) => {
  try {
    if (!regIdCheck(req.params.cardId)) {
      throw new NotFoundError('Неподходящий формат ID карточки');
    } else {
      const card = await Card.findById(req.params.cardId);
      if (!card) {
        throw new NotFoundError('Такая карта не существует');
      } else {
        res.send(card);
      }
    }
  } catch (err) {
    next(err);
  }
};

/** Контролер удаления карточки */
module.exports.deleteCard = async (req, res, next) => {
  try {
    if (!regIdCheck(req.params.cardId)) {
      throw new NotFoundError('Неподходящий формат ID карточки');
    } else {
      const card = await Card.findById(req.params.cardId).populate('user');
      if (!card) {
        throw new NotFoundError('Такая карта не существует');
      } else {
        const user = req.user._id;

        const cardOwner = JSON.stringify(card.owner).slice(1, -1);

        if (user !== cardOwner) {
          throw new ForbiddenError('Это чужая карта');
        } else {
          const cardForDel = await Card.findByIdAndRemove({
            _id: req.params.cardId,
          });
          res.send(cardForDel);
        }
      }
    }
  } catch (err) {
    next(err);
  }
};

/** Контролер добавления лайка карточке */
module.exports.addLike = async (req, res, next) => {
  try {
    if (!regIdCheck(req.params.cardId)) {
      throw new NotFoundError('Неподходящий формат ID карточки');
    } else {
      const card = await Card.findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: { likes: req.user._id } },
        { new: true },
      );
      if (!card) {
        throw new NotFoundError('Такая карта не существует');
      } else {
        res.send(card);
      }
    }
  } catch (err) {
    next(err);
  }
};

/** Контролер добавления лайка карточке */
module.exports.deleteLike = async (req, res, next) => {
  try {
    if (!regIdCheck(req.params.cardId)) {
      throw new NotFoundError('Неподходящий формат ID карточки');
    } else {
      const card = await Card.findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: req.user._id } },
        { new: true },
      );
      if (!card) {
        throw new NotFoundError('Такая карта не существует');
      } else {
        res.send(card);
      }
    }
  } catch (err) {
    next(err);
  }
};
