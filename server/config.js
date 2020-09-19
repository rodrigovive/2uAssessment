const path = require("path");

const clientPath = path.join(__dirname, "../client/build");

require("dotenv").config();

module.exports = {
  DB_URI: process.env.DB_URI || "mongodb://127.0.0.1:27017/invoices",
  PORT: process.env.PORT || 3000,
  CLIENT_PATH: clientPath,
};
