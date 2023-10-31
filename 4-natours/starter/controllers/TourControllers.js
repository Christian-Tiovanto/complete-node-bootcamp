const Tour = require('./../models/TourModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  if (!tour) return next(new AppError('There is no tour with that id', 404));
  res.status(200).json({
    status: 'success',
    data: tour,
  });
});

exports.getAllTour = catchAsync(async (req, res, next) => {
  const excludedQuery = ['page', 'limit', 'sort', 'fields'];

  // Filtering
  let queryStr = { ...req.query };
  excludedQuery.forEach((el) => delete queryStr[el]);
  const regex = /(gt|gte|lt|lte)/gi;
  queryStr = JSON.stringify(queryStr);
  queryStr = queryStr.replace(regex, (match) => `$${match}`);
  let tours = Tour.find(JSON.parse(queryStr));

  // Sorting
  if (req.query.sort) {
    tours.sort(req.query.sort.replace(',', ' '));
  } else {
    tours.sort('-createdAt');
  }

  // select Fields
  if (req.query.fields) {
    tours.select(req.query.fields.replace(',', ' '));
  } else {
    tours.select('-__v');
  }

  // Pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;
  tours.skip(skip).limit(limit);
  tours = await tours.find();
  if (!tours) return next(new AppError('There is no tour available', 404));
  res.status(200).json({
    status: 'success',
    len: tours.length,
    data: tours,
  });
});

exports.postTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.create(req.body);
  res.status(201).json({
    status: 'success',
    data: tour,
  });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  const data = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!data) return next(new AppError('There is no tour with that id', 404));
  res.status(200).json({
    status: 'success',
    data,
  });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  const documents = await Tour.findByIdAndDelete(req.params.id);
  if (!documents)
    return next(new AppError('there is no tour with that id', 404));
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getTourStats = catchAsync(async (req, res, next) => {
  const tours = await Tour.aggregate([
    {
      $group: {
        _id: '$difficulty',
        avgRatings: { $avg: '$ratingsAverage' },
        avgPrices: { $avg: '$price' },
        numRatings: { $sum: '$ratingsQuantity' },
        numTours: { $sum: 1 },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: {
        avgPrices: 1,
      },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: tours,
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  console.log(new Date(`${req.params.year}-01-01`));
  const tours = await Tour.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${req.params.year}-01-01`),
          $lte: new Date(`${req.params.year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $sort: { numTourStarts: 1 },
    },
    {
      $project: { _id: 0 },
    },
  ]);
  console.log(tours);
  res.status(200).json({
    status: 'success',
    data: tours,
  });
});
