const AppError = require('./../utils/appError');
const handleDuplicateDev = (err, req, res) => {
  console.log('dupl');
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate Fields value: ${value}. Please use another value`;
  return new AppError(message, 400);
};

const handleValidationError = (err, req, res) => {
  message = Object.values(err.errors).map((props) => {
    return props.message;
  });
  console.log(message);
  return new AppError(message.join(','), 400);
};

const handleCastError = (err, req, res) => {
  let message = Object.values(err.errors).map((props) => {
    return [props.path, props.value, props.kind];
  });
  message = message.map((message) => {
    return `invalid ${message[0]}:${message[1]},${message[0]} must be a ${message[2]}`;
  });
  return new AppError(message.join(','), 400);
};

const handleJWTError = (err, req, res) => {
  console.log('tesssss');
  console.log(err);
  return new AppError('invalid token,please log in again', 401);
};
const sendErrorProd = (err, req, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  res.status(500).json({
    status: 'failed',
    err,
  });
};
const sendErrorDev = (err, req, res) => {
  console.log(err);
  return res.status(err.statusCode).json({
    status: err.status,
    err,
    stack: err.stack,
    message: err.message,
  });
};

exports.globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Error';
  if (process.env.NODE_ENV == 'production') {
    let error = { ...err };
    console.log(err.name);
    if (err.code === 11000) error = handleDuplicateDev(err);
    if (err.name == 'ValidationError')
      error = handleValidationError(err, req, res);
    if (err.name == 'CastError') error = handleCastError(err);
    if (err.name == 'JsonWebTokenError') error = handleJWTError(err);
    sendErrorProd(error, req, res);
  } else if (process.env.NODE_ENV == 'development') {
    sendErrorDev(err, req, res);
  }
};
