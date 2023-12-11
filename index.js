const express = require('express');
const mongoose = require('mongoose');

const dotenv = require('dotenv');

const app = express();
dotenv.config();

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

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() =>
      console.log(`Server running on http://localhost:${process.env.PORT}`)
    )
    .catch((error) => console.error(error));
});
