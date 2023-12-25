const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require('./../models/UserModel');
const factory = require('./handlerFactory');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const writableStream = fs.createWriteStream('output.txt');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  writableStream.write(req.file.buffer);
  await sharp(req.file.buffer)
    .resize({ width: 500, height: 500 })
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);
  req.user.photo = req.file.filename;
  next();
});

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
