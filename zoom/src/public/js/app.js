const socket = io();

const MyFace = document.querySelector("#myFace");
const mute = document.querySelector("#mute");
const camera = document.querySelector("#camera");
const camerasSelect = document.querySelector("#cameras");
const welcome = document.querySelector("#welcome");
const call = document.querySelector("#call");

let myStream;
let muted = false;
let cameraOff = false;
call.hidden = true;
let roomName;
let myPeerConnection;

async function getCameras() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");
    const currentSelect = myStream.getVideoTracks()[0];
    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.innerText = camera.label;
      camerasSelect.appendChild(option);
      if (currentSelect.label === camera.label) {
        option.selected = true;
      }
    });
  } catch (e) {
    console.log(e);
  }
}

async function getMedia(DeviceId) {
  const initialState = {
    audio: true,
    video: { facingMode: "user" },
  };
  const NewCamera = { audio: true, video: { deviceId: { exact: DeviceId } } };
  try {
    myStream = await navigator.mediaDevices.getUserMedia(
      DeviceId ? NewCamera : initialState
    );
    if (!DeviceId) {
      await getCameras();
    }
    MyFace.srcObject = myStream;
  } catch (e) {
    console.log(e);
  }
}

function handleMuted() {
  myStream.getAudioTracks().forEach((track) => {
    track.enabled = !track.enabled;
  });
  if (!muted) {
    mute.innerText = "Unmute";
    muted = true;
  } else {
    mute.innerText = "mute";
    muted = false;
  }
}
function handleCamera() {
  myStream.getVideoTracks().forEach((track) => {
    track.enabled = !track.enabled;
  });
  if (!cameraOff) {
    camera.innerText = "camera on";
    cameraOff = true;
  } else {
    camera.innerText = "camera off";
    cameraOff = false;
  }
}

function handleSelectCamera() {
  getMedia(camerasSelect.value);
}

mute.addEventListener("click", handleMuted);
camera.addEventListener("click", handleCamera);
camerasSelect.addEventListener("input", handleSelectCamera);

function makeConnection() {
  myPeerConnection = new RTCPeerConnection();
  myStream
    .getTracks()
    .forEach((track) => myPeerConnection.addTrack(track, myStream));
}

async function startMedia() {
  welcome.hidden = true;
  call.hidden = false;
  await getMedia();
  makeConnection();
}

function handleSubmit(event) {
  event.preventDefault();
  const input = welcome.querySelector("input");
  socket.emit("join_room", input.value, startMedia);
  roomName = input.value;
  input.value = "";
}

welcomeForm = welcome.querySelector("form");
welcomeForm.addEventListener("submit", handleSubmit);

socket.on("welcome", async () => {
  console.log("someone joined");
  const offer = await myPeerConnection.createOffer();
  myPeerConnection.setLocalDescription(offer);
  socket.emit("offer", offer, roomName);
});

socket.on("offer", (offer) => {
  console.log(offer);
});
