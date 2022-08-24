require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app.js');
const PORT = process.env.PORT || 3500;

const { logErr } = require('./errorHandler.js');

mongoose.connection.once('open', () => {
  console.log('Database Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
    console.log('API Testing UI: http://localhost:3500/v0/api-docs/');
  });
});

mongoose.connection.on('error', err => {
  console.log(err);
  logErr(`MONGO ERR\t${err.name}: ${err.message}`);
});

