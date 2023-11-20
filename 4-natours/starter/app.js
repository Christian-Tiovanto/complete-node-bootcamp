const express = require('express');
const tourRouter = require('./Routes/TourRouter');
const userRouter = require('./Routes/UserRouter');
const reviewRouter = require('./Routes/ReviewRouter');
const app = express();
const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');
const cookieParser = require('cookie-parser');
const errorController = require('./controllers/errorController');
app.use(express.json());
app.use(cookieParser());
app.use('/', (req, res, next) => {
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.use(errorController.globalErrorHandler);
app.use('*', (req, res, next) => {
  res.status(404).json({
    status: 'failed',
    message: 'there is no api for that url',
  });
});
module.exports = app;
