const Tour = require('../models/TourModel');
// const Booking = require('../models/BookingModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  console.log(req.user);
  res.render('overview', { tours, user: req.user });
});

exports.login = catchAsync(async (req, res, next) => {
  res.render('login');
});

exports.tour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug })
    .populate('reviews')
    .populate('guides');

  res.render('tour', { tour, user: req.user });
});

exports.getAccount = catchAsync(async (req, res, next) => {
  res.render('account', { user: req.user });
});
