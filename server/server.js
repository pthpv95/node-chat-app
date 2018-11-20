const path = require("path");
const publicPath = path.join(__dirname, "../public");
const express = require("express");
const socketIO = require("socket.io");

const app = express();
var port = process.env.PORT || 3000;

const http = require("http");
var server = http.createServer(app);
var io = socketIO(server);
var { isValidString } = require("./utils/validation");

var { generateMessage, generateLocationMessage } = require("./utils/message");

io.on("connection", socket => {
  console.log("new connection");

  socket.on("join", (params, callback) => {
    if (!isValidString(params.name)) {
      callback("error");
    }
    socket.join(params.room);
    socket.emit(
      "newMessage",
      generateMessage("Admin", "welcome to the chat app")
    );

    socket.broadcast
      .to(params.room)
      .emit(
        "newMessage",
        generateMessage("Admin", `${params.name} has joined`)
      );

    callback();
  });

  socket.on("disconnect", () => {
    console.log("User was disconnected!");
  });

  // socket.emit(
  //   "newMessage",
  //   generateMessage("admin", "welcome to the chat app")
  // );

  // // broadcast for everyone but this user
  // socket.broadcast.emit(
  //   "newMessage",
  //   generateMessage("Admin", "new user has joined")
  // );

  socket.on("createLocationMessage", coords => {
    const message = generateLocationMessage(
      "Admin",
      coords.latitude,
      coords.longitude
    );
    io.emit("newLocationMessage", message);
  });

  socket.on("createMessage", (message, callback) => {
    io.emit("newMessage", generateMessage(message.from, message.text));
    callback();
  });
});

app.use(express.static(publicPath));
server.listen(port);
