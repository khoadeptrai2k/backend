require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const http = require('http').createServer(app);

// connect to mongodb
const URI = process.env.MONGODB_HOST_URL;
mongoose
  .connect(
    'mongodb+srv://quocnguyen:C4FTA4s6J6kuddBX@dp05.whmkdfu.mongodb.net/finalDB',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )

  .then(() => {
    console.log('Connected to Mongo!');
  })
  .catch((err) => {
    console.log(`Error connecting to Mongo: ${err}`);
  });

// routes
app.use('/api', require('./routes/index'));

const PORT = process.env.PORT || 4000;
http.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
