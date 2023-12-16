const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const dotenv = require('dotenv');

// routes
const userRoute = require('./routes/user');
const jobRoutes = require('./routes/job');

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/health', (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date(),
  };

  res.status(200).send(data);
});

app.get('/', (req, res) => {
  res.send('Hello World!!');
});

app.use('/users', userRoute);
app.use('/jobs', jobRoutes);

app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() =>
      console.log(`Server running on http://localhost:${process.env.PORT}`)
    )
    .catch((error) => console.error(error));
});
