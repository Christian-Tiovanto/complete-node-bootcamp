const express = require('express');
const tourRouter = require('./Routes/TourRouter');
const app = express();

app.use('/', tourRouter);

module.exports = app;
