const express = require('express');
const router = express.Router();
const bookingController = require('./../controllers/bookingController');

router
  .route('/checkout-session/:tourid')
  .get(bookingController.createCheckoutSession);

module.exports = router;
