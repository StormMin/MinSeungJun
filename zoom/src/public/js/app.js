const socket = io();

const room = document.querySelector("#room");
const form = room.querySelector("form");

function backend(msg) {
  console.log(msg);
}

const submitHandler = (event) => {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("room", input.value, backend);
  input.value = "";
};

form.addEventListener("submit", submitHandler);
