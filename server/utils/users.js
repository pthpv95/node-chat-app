class Users {
  constructor() {
    this.users = [];
  }
  addUser(id, name, room) {
    var user = { id, name, room };
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    var user = this.getUser(id);
    if (user) {
      this.users = this.users.filter(x => x.id !== user.id);
    }
    return user;
  }

  getUser(id) {
    return this.users.find(x => x.id === id);
  }

  getUserList(room) {
    var users = this.users.filter(x => x.room === room);
    var names = users.map(user => user.name);
    return names;
  }
}

module.exports = {
  Users
};
