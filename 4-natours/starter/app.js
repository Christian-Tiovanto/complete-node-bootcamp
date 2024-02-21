//# sourceMappingURL=app.js.map
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const hpp = require('hpp');

const tourRouter = require('./Routes/tourRouter');
const userRouter = require('./Routes/userRouter');
const reviewRouter = require('./Routes/reviewRouter');
const viewRouter = require('./Routes/viewRouter');
const bookRouter = require('./Routes/bookingRouter');
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1) GLOBAL MIDDLEWARES
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));
// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Set security HTTP headers
app.use(helmet(
  {
    contentSecurityPolicy:
    {
      directives:
      {
        'script-src': ["'self'", 'unpkg.com', 'cdnjs.cloudflare.com'],
        'img-src': ["'self'", 'tile.openstreetmap.org', 'unpkg.com', 'data:'],
        'connect-src': ["'self'", 'ws://127.0.0.1:1234']
      },
    }
  },
));

// Limit requests from same API
const limiter = rateLimit({
  limit: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});

app.use('/api', limiter)
app.use('/', (req, res, next) => {
  console.log(req.headers)
  console.log(res.getHeaders())
  next()
})



app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// 3) ROUTES
app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
