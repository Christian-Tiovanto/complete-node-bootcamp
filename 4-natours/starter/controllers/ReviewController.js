const Review = require('./../models/ReviewModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.postReview = catchAsync(async (req, res, next) => {
  const review = await Review.create({
    ...req.body,
    user: req.user.id,
    tour: req.params.tourid,
  });
  res.status(200).json({
    status: 'success',
    review,
  });
});

exports.getAllReview = catchAsync(async (req, res, next) => {
  const review = await Review.find();
  if (!review) return next(new AppError('there is no review available', 404));
  res.status(200).json({
    status: 'success',
    data: review,
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findOneAndUpdate(
    { tour: req.params.tourid },
    { rating: req.body.rating, review: req.body.review }
  );
  if (!review) return next(new AppError('there is no tour with that id', 404));

  res.status(201).json({
    status: 'success',
    message: 'Review has been successfully changed',
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.find({
    tour: req.params.tourid,
  });
  if (!review)
    return next(new AppError('There is no review for that tour', 404));
  res.status(200).json({
    status: 'success',
    data: review,
  });
});

exports.myReview = catchAsync(async (req, res, next) => {
  const review = await Review.find({ user: req.user.id });
  res.status(200).json({
    status: 'success',
    data: review,
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findOneAndDelete({
    user: req.user.id,
    tour: req.params.id,
  });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
