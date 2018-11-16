const { generateMessage } = require("./message");
var expect = require("expect");

describe("generateMessage", () => {
  it("should return new message", () => {
    const message = generateMessage("lee", "hello socket.io");
    expect(message.from).toBe("lee");
    expect(message.text).toBe("hello socket.io");
    expect(typeof message.createdAt).toBe("number");
  });
});
