const express = require('express');
const router = express.Router();
const tourController = require('../controllers/TourControllers');
const authController = require('../controllers/AuthController');

router.route('/getTourStats').get(tourController.getTourStats);
router.route('/getMonthlyPlan/:year').get(tourController.getMonthlyPlan);
router
  .route('/')
  .get(authController.protect, tourController.getAllTour)
  .post(tourController.postTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
