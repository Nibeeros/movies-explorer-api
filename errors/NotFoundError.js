const { NOT_FOUND } = require('../constants/constants');

module.exports = class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFound';
    this.statusCode = NOT_FOUND;
  }
};
