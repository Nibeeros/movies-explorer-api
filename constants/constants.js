const { MONGOOSE_DB = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const { JWT_SECRET = 'some-secret-key' } = process.env;

const linkRegex = /^https?:\/\/(www\.)?[\w\-._~:/?#[\]@!$&'()*+,;=]+\.[\w\-._~:/?#[\]@!$%&'()*+,;=]+#?$/;

// Status codes
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;
const CREATED = 201;
const CONFLICT = 409;

// Error messages
const serverErrorMsg = 'На сервере произошла ошибка';
const deletingRestrictedMsg = 'Пользователь может удалять только свои фильмы';
const noSuchMovieIdMsg = 'Передан несуществующий _id фильма';
const needToAuthMsg = 'Необходима авторизация';
const wrongLinkMsg = 'Неправильная ссылка';
const wrongEmailMsg = 'Неверный email';
const wrongPassOrEmailMsg = 'Неправильные почта или пароль';
const noSuchRouteMsg = 'Маршрут не найден';
const emailExistMsg = 'Такой email уже зарегистрирован';
const incorrectDataMsg = 'Переданы некорректные данные';

// Response messages
const authSuccessMsg = 'Авторизация прошла успешно!';
const logoutMsg = 'Сеанс завершен';

module.exports = {
  linkRegex,
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  SERVER_ERROR,
  CREATED,
  FORBIDDEN,
  CONFLICT,
  serverErrorMsg,
  deletingRestrictedMsg,
  noSuchMovieIdMsg,
  authSuccessMsg,
  logoutMsg,
  needToAuthMsg,
  wrongLinkMsg,
  wrongEmailMsg,
  wrongPassOrEmailMsg,
  noSuchRouteMsg,
  emailExistMsg,
  incorrectDataMsg,
  MONGOOSE_DB,
  JWT_SECRET,
};
