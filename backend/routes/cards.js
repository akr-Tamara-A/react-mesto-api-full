const router = require('express').Router();

const {
  getCards,
  deleteCard,
  createCard,
  getCard,
  addLike,
  deleteLike,
} = require('../controllers/cards');

const {
  cardValidation,
  cardIdValidation,
} = require('../middlewares/validation');

/** Обработка запроса всех карточек */
router.get('/cards', getCards);

/** Создание карточки */
router.post('/cards', cardValidation, createCard);

/** Обработка запроса отдельной карточки */
router.get('/cards/:cardId', cardIdValidation, getCard);

/** Обработка удаления отдельной карточки */
router.delete('/cards/:cardId', cardIdValidation, deleteCard);

/** Обработка добавления лайка карточке */
router.put('/cards/:cardId/likes', cardIdValidation, addLike);

/** Обработка удаления лайка карточке */
router.delete('/cards/:cardId/likes', cardIdValidation, deleteLike);

module.exports = router;
