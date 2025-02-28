const mongoose = require('mongoose');
const slugify = require('slugify');
const tourSchema = new mongoose.Schema({
  ratingsAverage: {
    type: Number,
    required: [true, 'Ratings must be around 1-5'],
    min: [1, 'must be above 1 and not greater than 5'],
    max: [5, 'must be above 1 and not greater than 5'],
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  images: {
    type: [String],
  },
  startDates: [Date],
  name: {
    type: String,
    required: [true, 'a tour must have a name'],
    unique: true,
    trim: true,
    maxlength: [40, 'a tour must have less than or equal to 40 characters'],
    minlength: [10, 'a tour must have more than or equal to 10 characters'],
  },
  duration: {
    type: Number,
    required: [true, 'a tour must have a durations'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'a tour must have a group size'],
  },
  difficulty: {
    type: String,
    enum: {
      values: ['easy', 'medium', 'difficult'],
      message: `difficulty must be either easy,medium, or difficult`,
    },
    required: [true, 'a tour must have a difficulty'],
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'a tour must have a summary'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'a tour must have a cover image'],
  },
  startLocation: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    coordinates: [Number],
    address: String,
    description: String,
  },
  locations: [
    {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
      days: Number
    },
  ],
  guides: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  slug: String,
});
tourSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'tour',
});

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name);
  next();
});
tourSchema.index({ tour: 1 }, { unique: true });
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
