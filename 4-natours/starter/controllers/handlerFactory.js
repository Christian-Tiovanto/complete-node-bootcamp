const Review = require('./../models/ReviewModel');
const User = require('./../models/UserModel');
const Tour = require('./../models/TourModel');
const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');
exports.getOne = (Model, popOptions) => {
  return catchAsync(async (req, res, next) => {
    let docs = Model.findById(req.params.id);
    if (popOptions) {
      popOptions.forEach((populateField) => {
        docs.populate(populateField);
      });
    }
    docs = await docs;
    if (!docs) return next(new AppError('There is no docs with that id', 404));
    res.status(200).json({
      status: 'success',
      data: docs,
    });
  });
};

exports.getAll = (Model) => {
  return catchAsync(async (req, res, next) => {
    const docs = await new APIFeatures(Model.find(), req.query)
      .filter()
      .sorting()
      .fields()
      .pagination().query;
    if (!docs) return next(new AppError('There is no docs available', 404));
    res.status(200).json({
      status: 'success',
      len: docs.length,
      data: docs,
    });
  });
};

exports.createOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const docs = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: docs,
    });
  });
};

exports.updateOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const docs = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!docs) return next(new AppError('There is no docs with that id', 404));
    res.status(200).json({
      status: 'success',
      data: docs,
    });
  });
};

exports.deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const docs = await Model.findByIdAndDelete(req.params.id);
    if (!docs) return next(new AppError('There is no docs with that id', 404));
    res.status(204).json({
      status: 'success',
      data: docs,
    });
  });
};
