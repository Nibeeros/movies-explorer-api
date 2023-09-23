const { BAD_REQUEST } = require('../constants/constants');

module.exports = class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequest';
    this.statusCode = BAD_REQUEST;
  }
};
