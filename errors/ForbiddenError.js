const { HTTP_STATUS_FORBIDDEN } = require('../utils/Constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_FORBIDDEN;
  }
}

module.exports = ForbiddenError;
