const router = require('express').Router();

const {
  getUsers,
  getUser,
  patchUser,
  patchUserAvatar,
} = require('../controllers/users');

const {
  idValidation,
  profileUpdateValidation,
  avatarUpdateValidation,
} = require('../middlewares/validation');

/** Обработка запроса всех пользователей */
router.get('/users', getUsers);

/** Обработка запроса отдельного пользователя */
router.get('/users/me', idValidation, getUser);

/** Обработка редактирования профиля пользователя */
router.patch('/users/me', profileUpdateValidation, patchUser);

/** Обработка изменения аватара пользователя */
router.patch('/users/me/avatar', avatarUpdateValidation, patchUserAvatar);

module.exports = router;
