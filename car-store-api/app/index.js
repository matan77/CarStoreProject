const bodyParser = require("body-parser");
const express = require("express");
const usersRouter = require('./routes/users');
const carsRouter = require('./routes/cars');
const ordersRouter = require('./routes/orders');

const app = express();
app.use(bodyParser.json());
app.use('/api/users', usersRouter);
app.use('/api/cars', carsRouter);
app.use('/api/orders', ordersRouter);

module.exports = app;