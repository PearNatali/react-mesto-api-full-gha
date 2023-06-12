require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');

const handleErrors = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const router = require('./routes/index');

const { PORT, MONGO_DB } = require('./app.config');

const app = express();

mongoose.connect(MONGO_DB);

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадет');
  }, 0);
});

app.use(router);

app.use(errorLogger);
app.use(errors());

app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
