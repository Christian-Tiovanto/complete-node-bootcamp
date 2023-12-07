const stripe = require('stripe')(
  'sk_test_51NyfhHHc0zTEmlqoPnICHsILGmkmGiubDYC4yY7TgyQggcVIfRnyIPfsgh1wZClswERKyurNeUXqb6UWpkiktTRK00yTLGmEFw'
);
const Booking = require('../models/bookingModel');
const Tour = require('../models/TourModel');
const catchAsync = require('./../utils/catchAsync');

exports.createCheckoutSession = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.tourid);
  const session = await stripe.checkout.sessions.create({
    success_url: 'http://127.0.0.1:3000/',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
            description: tour.summary,
            name: `${tour.name} Tour`,
          },
          unit_amount: tour.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
  });
  res.status(200).json({
    status: 'success',
    session,
  });
});

exports.createBooking = catchAsync(async (req, res, next) => {
  const { price, tour, user } = req.user;
  if (!price || !tour || !user) return next();
  await Booking.create({ price, tour, user });
  next();
});
