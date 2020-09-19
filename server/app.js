const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const config = require("./config");
const routerApi = require("./router/api");
const app = express();
const http = require("http");
const server = http.createServer(app);

require("./db/mongoose");
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routerApi);

server.listen(config.PORT, () => {
  console.log(`Server is running is ${config.PORT} ${process.env.NODE_ENV}`);
});
