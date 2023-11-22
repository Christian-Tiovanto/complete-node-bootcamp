const express = require('express');
const Router = express.Router();
const AuthController = require('./../controllers/AuthController');
const ReviewController = require('./../controllers/ReviewController');

Router.route('/').get(ReviewController.getAllReview);
Router.route('/:tourid')
  .get(AuthController.protect, ReviewController.getReview)
  .post(
    AuthController.protect,
    AuthController.restrictRolesTo(['user']),
    ReviewController.postReview
  )
  .patch(
    AuthController.protect,
    AuthController.restrictRolesTo(['user']),
    ReviewController.updateReview
  )
  .delete(
    AuthController.protect,
    AuthController.restrictRolesTo(['user']),
    ReviewController.deleteReview
  );

Router.route('/MyReview').get(
  AuthController.protect,
  ReviewController.myReview
);

module.exports = Router;
