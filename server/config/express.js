const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const config = require('./config');
const routes = require("../routes");

const app = express();

// if(config.env === 'development') {
app.use(logger('dev'));
// }

var distDir = '../../dist';
app.use(express.static(path.join(__dirname, distDir)))
app.use(express.static('../../assets'));
// app.use(/^((?!(v1)).)*/, (req, res) => {
//   res.sendFile(path.join(__dirname, distDir + '/index.html'));
// });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);

module.exports = app;
