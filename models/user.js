const mongoose = require('mongoose');
const validator = require('validator');
const bycript = require('bcryptjs');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { wrongEmailMsg, wrongPassOrEmailMsg } = require('../constants/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: wrongEmailMsg,
    },
  },
  password: {
    type: String,
    select: false,
    required: true,
    minlength: 8,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(wrongPassOrEmailMsg);
      }

      return bycript.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError(wrongPassOrEmailMsg);
        }

        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
