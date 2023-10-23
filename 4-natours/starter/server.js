const mongoose = require('mongoose');
const path = require('path');
const app = require('./app');
require('dotenv').config({ path: './config.env' });

mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
  console.log(`DB Connection Successfull`);
});

const port = 3000;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
