const socket = io();

const enterRoom = document.querySelector("#enterRoom");
const form = enterRoom.querySelector("form");
const room = document.querySelector("#room");
let roomName;
room.hidden = true;

function makeMessage(msg) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = msg;
  ul.appendChild(li);
}

function done() {
  enterRoom.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room : ${roomName}`;
}

const roomHandler = (event) => {
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_message", input.value, roomName, () => {
    makeMessage(`You: ${value}`);
  });
  input.value = "";
};

const nickHandler = () => {
  const input = enterRoom.querySelector("#nick");
  socket.emit("nick", input.value);
  input.value = "";
};

const submitHandler = (event) => {
  event.preventDefault();
  const input = form.querySelector("#roomName");
  roomName = input.value;
  nickHandler();
  socket.emit("enter_Room", input.value, done);
  input.value = "";
  const msgForm = room.querySelector("#msg");
  msgForm.addEventListener("submit", roomHandler);
};

form.addEventListener("submit", submitHandler);

socket.on("welcome", (user) => {
  makeMessage(`${user} joined`);
});

socket.on("bye", (user) => {
  makeMessage(`${user} lefted`);
});

socket.on("new_message", makeMessage);

socket.on("updated_room", (rooms) => {
  const roomList = enterRoom.querySelector("ul");
  roomList.innerHTML = "";
  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.innerText = room;
    roomList.appendChild(li);
  });
});
