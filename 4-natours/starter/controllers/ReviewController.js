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

