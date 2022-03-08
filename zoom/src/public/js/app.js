const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connected to Server ✔️");
});
socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});
socket.addEventListener("close", () => {
  console.log("Disconnected to Server ⛔");
});
const makeMessage = (type, payload) => {
  const msg = { type, payload };
  return JSON.stringify(msg);
};
const submitHandler = (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value));
  input.value = "";
};

const nickHandler = (event) => {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nick", input.value));
  input.value = "";
};

messageForm.addEventListener("submit", submitHandler);
nickForm.addEventListener("submit", nickHandler);
