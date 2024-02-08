const Tour = require('./../models/TourModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const sharp = require('sharp');
const path = require("path")
const fs = require('fs')
exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  if (!tour) return next(new AppError('There is no tour with that id', 404));
  res.status(200).json({
    status: 'success',
    data: tour,
  });
});

exports.getAllTour = catchAsync(async (req, res, next) => {
  const tours = await new APIFeatures(Tour.find(), req.query)
    .filter()
    .sorting()
    .fields()
    .pagination().query;

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

exports.resizeTourPhoto = catchAsync(async (req, res, next) => {
  if (!req.files.imageCover && !req.files.images) return next();
  if (req.files.imageCover) {
    req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/tours/${req.body.imageCover}`);
  }
  if (req.files.images.length < 3) next(new AppError('Please upload 3 images foto', 400));
  req.body.images = [];
  await Promise.all(
    req.files.images.map(async (file, index) => {
      image = `tour-${req.params.id}-${Date.now()}-${index}.jpeg`;
      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/tours/${image}`);
      req.body.images.push(image);
    })
  );
  next();
});

exports.updateTour = catchAsync(async (req, res, next) => {
  console.log(req.body)
  req.body.locations = JSON.parse(req.body.locations)
  // console.log(req.body.locations)
  const data = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!data) return next(new AppError('There is no tour with that id', 404));
  // The directory where your images are stored
  const directory = path.join(__dirname, '..', 'public', 'img', 'tours')
  // Read File Directory and delete the previous Image for the same Tour
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      if (file.includes(req.params.id)) {
        if (file.split("-")[2].replace(".jpeg", '') < Date.now() - 10000)
          fs.unlink(path.join(directory, file), err => {
            if (err) throw err;
            console.log(`Deleted file: ${file}`);
          });
      }
    });
  })
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
