const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const config = require("./config");
const routerApi = require("./router/api");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const socket = require("./socket");
require("./db/mongoose");
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, _, next) {
  req.io = io;
  next();
});
app.use("/api", routerApi);

app.use(express.static(clientPath));

app.get("*", (_, res) => {
  res.sendFile(clientPath + "/index.html");
});

server.listen(config.PORT, () => {
  console.log(`Server is running is ${config.PORT} ${process.env.NODE_ENV}`);
});

socket.start(io);
