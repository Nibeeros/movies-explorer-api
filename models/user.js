const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { AuthError } = require('../errors');
const {
  MESSAGE_ERROR_AUTH_WRONG_DATA,
  MESSAGE_ERROR_WRONG_EMAIL,
} = require('../utils/Constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: MESSAGE_ERROR_WRONG_EMAIL,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError(MESSAGE_ERROR_AUTH_WRONG_DATA);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError(MESSAGE_ERROR_AUTH_WRONG_DATA);
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
