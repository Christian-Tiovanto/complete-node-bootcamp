const express = require('express');
const router = express.Router();
const tourController = require('../controllers/TourControllers');
const authController = require('../controllers/AuthController');
const multer = require('multer');
const AppError = require('./../utils/appError');
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    console.log(file);
    if (file.mimetype.startsWith('image')) return cb(null, true);
    return cb(new AppError('please upload an image, not any other type', 400));
  },
});

router.route('/getTourStats').get(tourController.getTourStats);
router.route('/getMonthlyPlan/:year').get(tourController.getMonthlyPlan);
router
  .route('/')
  .get(authController.protect, tourController.getAllTour)
  .post(tourController.postTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictRolesTo('admin', 'lead-guide'),
    upload.fields([
      { name: 'images', maxCount: 3 },
      { name: 'imageCover', maxCount: 1 },
    ]),
    tourController.resizeTourPhoto,
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictRolesTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
