const Tour = require('../models/TourModel');
// const Booking = require('../models/BookingModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  console.log(req.user);
  res.render('overview', { tours: tours, user: req.user });
});

exports.login = catchAsync(async (req, res, next) => {
  res.render('login');
});

exports.tour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug })
    .populate('reviews')
    .populate('guides');
  console.log(tour.locations)
  res.render('tour', { tour, user: req.user, isBooked: "asdfasdf" });
});

exports.getAccount = catchAsync(async (req, res, next) => {
  res.render('account', { user: req.user });
});
exports.manageTourSettings = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  res.render('manageTourSettings', { tours, user: req.user });
});

exports.manageTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug });

  res.render('manageTour', { tour, user: req.user });
});
