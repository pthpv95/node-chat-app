const { generateMessage, generateLocationMessage } = require("./message");
var expect = require("expect");
var { Users } = require("./users");

describe("generateMessage", () => {
  it("should return new message", () => {
    const message = generateMessage("lee", "hello socket.io");
    expect(message.from).toBe("lee");
    expect(message.text).toBe("hello socket.io");
    expect(typeof message.createdAt).toBe("number");
  });
});

describe("generateLocationMessage", () => {
  it("should return new message", () => {
    const message = generateLocationMessage("admin", 100, 200);
    expect(message.from).toBe("admin");
    expect(message.url).toBe(`https://www.google.com/maps?q=${100},${200}`);
    expect(typeof message.createdAt).toBe("number");
  });
});

describe("Users", () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: 1,
        name: "mike",
        room: "node course"
      },
      {
        id: 2,
        name: "doe",
        room: "react course"
      },
      {
        id: 3,
        name: "jessy",
        room: "react course"
      }
    ];
  });

  it("should add new user", () => {
    var users = new Users();
    var user = {
      id: 123,
      name: "lee",
      room: "react"
    };
    var returnUser = users.addUser(123, "lee", "react");

    expect(users.users).toEqual([returnUser]);
    expect(returnUser).toEqual(user);
  });

  it("should return user list in same room", () => {
    var usersList = users.getUserList("react course");
    expect(usersList).toEqual(["doe", "jessy"]);
  });

  it("should return user list in same room", () => {
    var usersList = users.getUserList("react course");
    expect(usersList).toEqual(["doe", "jessy"]);
  });

  it("should remove a user", () => {
    var removedReturnUser = users.removeUser(1);
    var expectedUserRemoved = {
      id: 1,
      name: "mike",
      room: "node course"
    };
    expect(removedReturnUser).toEqual(expectedUserRemoved);
    expect(users.users.length).toEqual(2);
  });

  it("should not remove a user when not match id", () => {
    var removedReturnUser = users.removeUser(10);
    expect(removedReturnUser).toBeFalsy();
    expect(users.users.length).toEqual(3);
  });

  it("should get user with id = 1", () => {
    var user = users.getUser(1);

    expect(user).toEqual({
      id: 1,
      name: "mike",
      room: "node course"
    });
  });

  it("should return undefined when cannot find user", () => {
    var user = users.getUser(10);
    expect(user).toBeFalsy();
  });
});
