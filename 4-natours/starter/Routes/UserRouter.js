const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/userController');
router.route('/').post(AuthController.signup);
router
  .route('/updatePassword')
  .post(AuthController.protect, AuthController.updatePassword);
router.route('/login').post(AuthController.login);
router.route('/forgotPassword').post(AuthController.forgotPassword);
router.route('/resetpassword/:token').post(AuthController.resetPassword);
router.route('/updateMe').post(AuthController.protect, UserController.updateMe);

module.exports = router;
