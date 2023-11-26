const Review = require('./../models/ReviewModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');
exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourID;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
exports.getAllReview = factory.getAll(Review);
exports.postReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.getReview = factory.getOne(Review, ['tour', 'user']);
exports.myReview = catchAsync(async (req, res, next) => {
  const review = await Review.find({ user: req.user.id });
  res.status(200).json({
    status: 'success',
    data: review,
  });
});
