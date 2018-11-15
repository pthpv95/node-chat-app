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

  socket.emit("newNoti", {
    content: "best deal black friday",
    createdAt: new Date().getTime()
  });

  socket.on("sendMessage", message => {
    console.log("New message:", );
    io.emit("newMessage", {
      ...message,
      createdAt: new Date().getTime()
    });
  });
});

app.use(express.static(publicPath));
server.listen(port);
