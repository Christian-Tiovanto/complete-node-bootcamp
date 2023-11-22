const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please tell us your name'],
  },
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: 'invalid email',
    },
    required: [true, 'please tell us your email'],
    unique: true,
  },
  role: {
    type: String,
    enum: {
      values: ['user', 'admin', 'guide', 'lead-guide'],
      message: 'invalid user role',
    },
    required: [true, 'user must have a role'],
    default: 'user',
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  photo: [String],
  password: {
    type: String,
    required: [true, 'user must have a password'],
    minlength: [8, 'password must be at least 8 character'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'please confirm your password'],
    validate: {
      validator: function (val) {
        console.log('tessssss ');
        return val == this.password;
      },
      message: 'password is not the same',
    },
    select: false,
  },
  resetPasswordToken: {
    type: String,
  },
  expiredPasswordToken: {
    type: Date,
  },
});
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.isCorrectPassword = async function (password, hashpassword) {
  return await bcrypt.compare(password, hashpassword);
};

userSchema.methods.createPasswordResetToken = async function () {
  const buffer = crypto.randomBytes(32).toString('hex');
  const resetToken = crypto.createHash('sha256').update(buffer).digest('hex');
  this.resetPasswordToken = resetToken;
  this.expiredPasswordToken = Date.now() + 10 * 1000 * 60;
  return resetToken;
};
const user = mongoose.model('User', userSchema);

module.exports = user;
