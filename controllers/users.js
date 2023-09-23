const mongoose = require('mongoose');
const bycript = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  CREATED, authSuccessMsg, logoutMsg, emailExistMsg, incorrectDataMsg, JWT_SECRET,
} = require('../constants/constants');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');

// Returns user's info (email and name)
module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

// User's info update (email and name)
module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(emailExistMsg));
      }
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(incorrectDataMsg));
      }
      next(err);
    });
};

// Creates new user
module.exports.createUser = (req, res, next) => {
  const { email, name } = req.body;

  bycript
    .hash(req.body.password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      res.status(CREATED).send({
        data: {
          name: user.name,
          email: user.email,
        },
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(emailExistMsg));
      }
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(incorrectDataMsg));
      }
      next(err);
    });
};

// Returns JWT once email and password verified
module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });

      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: 'strict',
        })
        .send({ message: authSuccessMsg });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(incorrectDataMsg));
      }
      next(err);
    });
};

// Removes JWT from cookies once user signout
module.exports.logoutUser = (req, res) => {
  res.clearCookie('jwt').send({ message: logoutMsg });
};
