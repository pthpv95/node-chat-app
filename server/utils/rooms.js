const { updateItemInArray, updateObject } = require("./array");

class Rooms {
  constructor() {
    this.rooms = [];
  }

  addRoom(name, userId) {
    var room = this.getRoom(name);

    // update user for existing room
    if (room) {
      var users = [...room.users, { id: userId }];
      this.updateRoom(room.id, users);
      return this.rooms;
    } else {
      // create new room
      var room = { id: new Date().getTime(), name, users: [{ id: userId }] };
      this.rooms.push(room);
      return this.rooms;
    }
  }

  getRooms() {
    return this.rooms;
  }

  getRoom(name) {
    return this.rooms.find(x => x.name === name);
  }

  removeRoom(name) {
    this.rooms = this.rooms.filter(x => x.name !== name);
    return this.rooms;
  }

  checkRoomStatus(roomName) {
    var room = this.getRoom(roomName);
    if (room.users.length === 0) {
      return "EMPTY_ROOM";
    }
    return "ACTIVE";
  }

  removeLeftUserInRoom(roomName, userId) {
    var room = this.getRoom(roomName);
    var users = room.users.filter(x => x.id !== userId);
    this.updateRoom(room.id, users);
  }

  updateRoom(roomId, users) {
    var newRooms = updateItemInArray(this.rooms, roomId, item => {
      return updateObject(item, {
        ...item,
        users
      });
    });
    this.rooms = newRooms;
  }
}

module.exports = { Rooms };
