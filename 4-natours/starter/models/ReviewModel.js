const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review can not be empty'],
  },
  rating: {
    type: Number,
    min: [1, 'rating must be above 1.0'],
    max: [5, 'rating must be below 5.0'],
    require: [true, 'ratings cant be null'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'review must be belong to a user'],
  },
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    required: [true, 'review must be belong to a tour'],
  },
});

const review = mongoose.model('Review', ReviewSchema);
module.exports = review;
