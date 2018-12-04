class Rooms {
  constructor() {
    this.rooms = [];
  }

  addRoom(name) {
    if (this.rooms.filter(x => x.name === name).length == 0) {
      var room = { id: new Date().getTime(), name };
      this.rooms.push(room);
      return room;
    }
  }

  getRooms() {
    return this.rooms;
  }

  removeRoom(name) {
    this.rooms = this.rooms.filter(x => x.name !== name);
    return this.rooms;
  }
}

module.exports = { Rooms };
