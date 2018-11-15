var socket = io();

socket.on("connect", () => {
  console.log("Connected to server.");
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

socket.on("newNoti", response => {
  console.log(response);
});

socket.on("newMessage", message => {
  const string = `<b>${message.from}</b>: ${message.text} <br/>`;
  $("#chat-room").append(string);
});

this.username = "guest-" + Math.floor(Math.random() * 100 + 1);
// (function init() {
//   this.username = window.prompt("What should I call you, mate?");
//   document.getElementById("show-greeting").value = "Hi " + this.username + ",";
// })();

document.getElementById("btn-send").addEventListener("click", e => {
  e.preventDefault();
  // if (this.username === undefined) {
  //   this.username = window.prompt(
  //     "Want to change your name or just keep anonymous ?"
  //   );
  // } else {
  //   this.username = "anonymous";
  // }

  var textElement = document.getElementById("text");
  socket.emit("sendMessage", {
    from: this.username,
    text: textElement.value
  });

  textElement.value = "";
});

