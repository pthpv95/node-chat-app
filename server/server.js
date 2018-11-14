const path = require("path");
const publicPath = path.join(__dirname, "../public");
const express = require("express");
const socketIO = require("socket.io");

const app = express();
var port = process.env.PORT || 3000;

const http = require("http");
var server = http.createServer(app);
var io = socketIO(server);
io.on("connection", socket => {
  console.log("new connection");

  socket.on("disconnect", () => {
    console.log("User was disconnected!");
  });
});

app.use(express.static(publicPath));
server.listen(port);
