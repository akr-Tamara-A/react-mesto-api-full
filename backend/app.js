const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
require('dotenv').config();

const routes = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** подключаемся к серверу mongo */
mongoose.connect('mongodb://localhost:27017/mestodb2', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

/** Обработка запросов */
app.use(express.static(path.join(__dirname, 'public')));
app.use(requestLogger);
// app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

/** Обработка ошибок */
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  console.log(err);
  let { statusCode = 500, message } = err;

  if (err.errors && err.errors.email.properties.type === 'unique') {
    statusCode = 409;
    message = err.errors.email.message;
  }

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

/** Слушатель порта */
app.listen(PORT);
