const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/AuthController');
//  const bookingController = require('../controllers/bookingController');

const Router = express.Router();

Router.route('/').get(authController.isLoggedIn, viewController.getOverview);
Router.route('/login').get(viewController.login);
Router.route('/tour/:slug').get(authController.isLoggedIn, viewController.tour);
Router.route('/me').get(authController.isLoggedIn, viewController.getAccount);
Router.get(
  '/manage-tours',
  authController.isLoggedIn,
  authController.restrictRolesTo('admin', 'lead-guide'),
  viewController.manageTourSettings
);
Router.get(
  '/manage-tours/:slug',
  authController.isLoggedIn,
  authController.restrictRolesTo('admin', 'lead-guide'),
  viewController.manageTour
);
// Router.route('/my-tours').get(
//   bookingController.createBooking,
//   authController.isLoggedIn,
//   viewController.myTour
// );
// Router.post('/update-my-settings', authController.isLoggedIn);
// Router.use((err, req, res, next) => {
//   console.log(err);
//   res.status(err.statusCode).render('error', { msg: err.message });
// });
module.exports = Router;
