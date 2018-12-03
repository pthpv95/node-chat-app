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
const { Users } = require("./utils/users");
const { Rooms } = require("./utils/rooms");
var rooms = new Rooms();
var users = new Users();

var { generateMessage, generateLocationMessage } = require("./utils/message");

io.on("connection", socket => {
  console.log("new connection" + new Date());

  const onlineRooms = rooms.getRooms();
  console.log("onlineRooms", onlineRooms);
  io.emit("updateRoomList", onlineRooms);

  socket.on("join", (params, callback) => {
    if (!isValidString(params.name)) {
      callback("Room and name are required");
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    rooms.addRoom(params.room);

    io.emit("updateRoomList", onlineRooms);
    io.to(params.room).emit("updateUserList", users.getUserList(params.room));
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
    var user = users.removeUser(socket.id);

    if (user) {
      var hasUserInRoom = onlineRooms.find(x => x.name === user.room);
      if (hasUserInRoom) {
        rooms.removeRoom(user.room);
        io.emit("updateRoomList", onlineRooms);
      }

      io.to(user.room).emit("updateUserList", users.getUserList(user.room));
      io.to(user.room).emit(
        "newMessage",
        generateMessage("Admin", `${user.name} has left the room.`)
      );
    }
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
    var user = users.getUser(socket.id);

    if (user && coords) {
      const message = generateLocationMessage(
        user.name,
        coords.latitude,
        coords.longitude
      );
      io.emit("newLocationMessage", message);
    }
  });

  socket.on("createMessage", (message, callback) => {
    var user = users.getUser(socket.id);

    if (user && isValidString(message.text)) {
      io.to(user.room).emit(
        "newMessage",
        generateMessage(user.name, message.text)
      );
    }
    callback();
  });
});

app.use(express.static(publicPath));
server.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
