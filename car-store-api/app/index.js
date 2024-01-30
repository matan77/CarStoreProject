const bodyParser = require("body-parser");
const express = require("express");
const usersRouter = require('./routes/users');

const app = express();
app.use(bodyParser.json());
app.use('/api/users', usersRouter)

module.exports = app;