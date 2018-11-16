const path = require("path");
const publicPath = path.join(__dirname, "../public");
const express = require("express");
const socketIO = require("socket.io");

const app = express();
var port = process.env.PORT || 3000;

const http = require("http");
var server = http.createServer(app);
var io = socketIO(server);

var { generateMessage } = require("./utils/message");

io.on("connection", socket => {
  console.log("new connection");

  socket.on("disconnect", () => {
    console.log("User was disconnected!");
  });

  socket.emit(
    "newMessage",
    generateMessage("admin", "welcome to the chat app")
  );

  // broadcast for everyone but this user
  socket.broadcast.emit(
    "newMessage",
    generateMessage("Admin", "new user has joined")
  );

  socket.on("sendMessage", message => {
    console.log("New message:");
    io.emit("newMessage", generateMessage(message.from, message.text));

    // socket.broadcast.emit("newMessage", {
    //   text: "new product launch",
    //   createdAt: new Date().getTime()
    // });
  });
});

app.use(express.static(publicPath));
server.listen(port);
