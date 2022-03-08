const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connected to Server ✔️");
});
socket.addEventListener("message", (message) => {
  console.log("Server says", message.data);
});
socket.addEventListener("close", () => {
  console.log("Disconnected to Server ⛔");
});

setTimeout(() => {
  socket.send("Here is The Lord");
}, 10000);
