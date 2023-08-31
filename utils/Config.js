require('dotenv').config();

const origin = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:4000',
  'http://localhost:4001',
  'api.nibfilm.nomoredomainsicu.ru',
];

const {
  PORT = 3000,
  REACT_APP_API_URL = null,
} = process.env;

if (process.env.NODE_ENV !== 'production') {
  origin.push(`http://localhost:${PORT}`);
} else if (REACT_APP_API_URL) {
  origin.push(REACT_APP_API_URL);
}

const {
  JWT_KEY = 'jwt',
  JWT_SECRET = 'secret-key',
  MONGODB_BASE = 'bitfilmsdb',
  MONGODB_URI = `mongodb://127.0.0.1:27017/${MONGODB_BASE}`,
} = process.env;

console.log({ origin });

module.exports = {
  PORT,
  JWT_KEY,
  JWT_SECRET,
  MONGODB_URI,
  origin,
};
