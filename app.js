require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const { corsHandler } = require('./middlewares/cors');
const { limiter } = require('./middlewares/limiter');

const errorHandler = require('./middlewares/errorHandler');
const { MONGOOSE_DB } = require('./constants/constants');

const origin = [
  'http://localhost:3001',
  'http://localhost:3000',
  'http://localhost:4000',
  'http://localhost:4001',
  'http://nibfilm.nomoredomainsicu.ru',
  'https://nibfilm.nomoredomainsicu.ru',
];

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect(MONGOOSE_DB);

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
// app.use(corsHandler);
app.use(cors({ origin, credentials: true, maxAge: 40 }));

app.use('/', limiter, require('./routes/index'));

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
