const express = require('express');
const Router = express.Router();
const AuthController = require('./../controllers/AuthController');
const ReviewController = require('./../controllers/ReviewController');

Router.route('/:tourid').post(
  AuthController.protect,
  AuthController.restrictRolesTo(['user']),
  ReviewController.postReview
);

module.exports = Router;
