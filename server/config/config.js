// require and configure dotenv
require('dotenv').config();

const keys = require("../keys");

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 4000
}

module.exports = config;