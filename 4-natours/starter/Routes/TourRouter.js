const express = require('express');
const router = express.Router();
const tourController = require('./../controllers/TourControllers');

router.route('/getTourStats').get(tourController.getTourStats);
router.route('/getMonthlyPlan/:year').get(tourController.getMonthlyPlan);
router.route('/').get(tourController.getAllTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .post(tourController.postTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
