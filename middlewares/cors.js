const allowedCors = [
  'https://api.nibfilm.nomoredomainsicu.ru',
  'http://api.nibfilm.nomoredomainsicu.ru',
  'http://nibfilm.nomoredomainsicu.ru',
  'https://nibfilm.nomoredomainsicu.ru',
  'http://localhost:3001',
  'http://localhost:3000',
  'http://localhost:4001',
  'http://localhost:4000',
];

const corsHandler = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Credentials', true);
    return res.end();
  }

  return next();
};

module.exports = { corsHandler };
