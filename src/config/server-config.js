const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  APP_NAME: process.env.APP_NAME,
};
