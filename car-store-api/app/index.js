const bodyParser = require("body-parser");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require("express");

const usersRouter = require('./routes/users');
const carsRouter = require('./routes/cars');
const ordersRouter = require('./routes/orders');
const statisticsRouter = require('./routes/statistics');

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api/users', usersRouter);
app.use('/api/cars', carsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/statistics', statisticsRouter);

module.exports = app;