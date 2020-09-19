module.exports = {
  start: function (io) {
    io.on("connection", function (socket) {
      socket.on("join", function (user) {
        console.log("user", user);
      });
    });
  },
};
