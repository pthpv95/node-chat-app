const { generateMessage, generateLocationMessage } = require("./message");
var expect = require("expect");

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
