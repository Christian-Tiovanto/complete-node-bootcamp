const User = require('../models/UserModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const util = require('util');
const sendMail = require('../utils/email');

exports.createUser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  const token = await util.promisify(jwt.sign)(
    { id: user._id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRES }
  );
  user.password = undefined;
  user.passwordConfirm = undefined;
  res.status(201).cookie('jwt', token).json({
    status: 'success',
    data: user,
    token,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  if (!req.body.password || !req.body.email)
    return next(new AppError('Please input your email and password', 400));
  const user = await User.findOne({ email: req.body.email }).select(
    '+password'
  );
  if (!user) return next(new AppError('Wrong email or pasword', 400));
  if (!(await user.isCorrectPassword(req.body.password, user.password)))
    return next(new AppError('Wrong email or password', 400));
  req.user = user;
  console.log('coba');
  const token = await util.promisify(jwt.sign)(
    { id: user._id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRES }
  );
  console.log(token);
  res.status(200).cookie('jwt', token).json({
    status: 'Success',
    message: 'succesfully logged in',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) return next(new AppError('you are not logged in', 401));
  const decoded = await util.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );
  const user = await User.findById(decoded.id);
  if (!user)
    return next(
      new AppError('The user belonging to this token no longer exist ', 401)
    );
  req.user = user;

  next();
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('+password');
  if (!req.body.password || !req.body.passwordConfirm)
    return next(
      new AppError('Provide your password and password confirm', 400)
    );
  if (!(await user.isCorrectPassword(req.body.currentPassword, user.password)))
    return next(new AppError('incorrect password'), 401);
  // user.password = req.body.password;
  // user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  const token = await util.promisify(jwt.sign)(
    { data: user._id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRES }
  );
  res.status(200).cookie('jwt', token, { httpOnly: true }).json({
    status: 'success',
  });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(new AppError('There is no user with that email address', 404));
  const token = await user.createPasswordResetToken();
  const resetURL = `http://127.0.0.1:3000/api/v1/users/resetpassword/${token}`;
  const message = `forgot your password? submit a patch request with your new password and confirm password to:${resetURL}.\nif you didnt 
  forget your password. Please ignore this`;

  try {
    await sendMail({
      message,
      to: user.email,
      subject: 'your password reset token is valid for 10 minutes',
    });
    await user.save({ validateBeforeSave: false });
    res.status(200).json({
      status: 'success',
      message: 'token sent to email',
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.expiredPasswordToken = undefined;
    return next(new AppError('there is a problem sending the email', 400));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  console.log(req.params);
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    expiredPasswordToken: { $gt: Date.now() },
  });
  if (!user) return next(new AppError('Token has expired'));
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.resetPasswordToken = undefined;
  user.expiredPasswordToken = undefined;
  await user.save();
  res.status(200).json({
    status: 'success',
    message: 'password has been successfully changed',
  });
});

exports.restrictRolesTo = (roles) => {
  return catchAsync(async (req, res, next) => {
    console.log(roles);
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You are restricted to do that', 401));
    }
    next();
  });
};
