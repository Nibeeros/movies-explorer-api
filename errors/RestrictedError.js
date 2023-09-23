const { FORBIDDEN } = require('../constants/constants');

module.exports = class RestrictedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Forbidden';
    this.statusCode = FORBIDDEN;
  }
};
