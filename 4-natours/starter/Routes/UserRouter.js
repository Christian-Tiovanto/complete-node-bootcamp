const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
router.route('/').post(AuthController.createUser);
router
  .route('/updatePassword')
  .post(AuthController.protect, AuthController.updatePassword);
router.route('/login').post(AuthController.login);
router.route('/forgotPassword').post(AuthController.forgotPassword);
router.route('/resetpassword/:token').post(AuthController.resetPassword);

module.exports = router;
