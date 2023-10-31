const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });
const fs = require('fs');
const Tour = require('./../../models/TourModel');
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
  console.log(`DB Connection Successfull`);
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

console.log(tours.length);
if (process.argv[2] == 'import') {
  for (const tour of tours) {
    Tour.create(tour);
  }
}
