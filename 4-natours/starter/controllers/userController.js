const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require('./../models/UserModel');
const factory = require('./handlerFactory');
const multer = require('./')
exports.updateMe = catchAsync(async (req, res, next) => {
  req.user.name = req.body.name;
  req.user.email = req.body.email;
  
  await req.user.save();
  res.status(200).json({
    status: 'success',
    user: req.user,
  });
});

exports.updateUser = factory.updateOne(User);
exports.getUser = factory.getOne(User);
exports.getAllUser = factory.getAll(User);
exports.deleteUser = factory.deleteOne(User);
