const mongoose = require('mongoose');
const Tour = require('./../models/TourModel');
const AppError = require('./../utils/appError');
const ReviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review can not be empty'],
  },
  rating: {
    type: Number,
    min: [1, 'rating must be above 1.0'],
    max: [5, 'rating must be below 5.0'],
    required: [true, 'ratings cant be null'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', //
    required: [true, 'review must be belong to a user'],
  },
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    required: [true, 'review must be belong to a tour'],
  },
});

ReviewSchema.index({ tour: 1, user: 1 }, { unique: true });

ReviewSchema.pre('save', async function (next) {
  const doc = await Tour.findById(this.tour);
  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }
});

const review = mongoose.model('Review', ReviewSchema);
module.exports = review;
