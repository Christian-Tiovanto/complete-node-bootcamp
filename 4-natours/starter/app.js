const express = require('express');
const tourRouter = require('./Routes/TourRouter');
const app = express();
const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');
app.use(express.json());
console.log(catchAsync);
// app.use(
//   catchAsync((req, res, next) => {
//     console.log('tes');
//     throw new AppError('tes', 404);
//   })
// );
app.use('/api/v1/tours', tourRouter);

app.use((err, req, res, next) => {
  res.status(404).json({
    status: 'failed',
    err,
  });
});
module.exports = app;
