const express = require('express');
const Router = express.Router();
const AuthController = require('./../controllers/AuthController');
const ReviewController = require('./../controllers/ReviewController');

Router.route('/').get(ReviewController.getAllReview);

Router.route('/:id')
  .post(
    AuthController.protect,
    AuthController.restrictRolesTo(['user']),
    ReviewController.setTourUserIds,
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
  )
  .get(ReviewController.getReview);

module.exports = Router;
