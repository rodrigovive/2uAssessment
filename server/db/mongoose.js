const config = require("../config");
const mongoose = require("mongoose");
const connection = mongoose.connection;

mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.once("open", () => {
  console.log("MONGO db established");
});
