const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/userController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.route('/').post(AuthController.signup);
router
  .route('/updatePassword')
  .post(AuthController.protect, AuthController.updatePassword);
router.route('/login').post(AuthController.login);
router.route('/forgotPassword').post(AuthController.forgotPassword);
router.route('/resetpassword/:token').post(AuthController.resetPassword);
router
  .route('/updateMe')
  .post(
    AuthController.protect,
    upload.single('photo'),
    UserController.resizeUserPhoto,
    UserController.updateMe
  );
router.route('/logout').get(AuthController.logOut);
module.exports = router;
