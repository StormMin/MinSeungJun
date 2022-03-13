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
let myDataChannel;

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

async function handleSelectCamera() {
  await getMedia(camerasSelect.value);
  if (myPeerConnection) {
    const myVideo = myStream.getVideoTracks()[0];
    const videoSender = myPeerConnection
      .getSenders()
      .find((sender) => sender.track.kind === "video");
    videoSender.replaceTrack(myVideo);
  }
}

mute.addEventListener("click", handleMuted);
camera.addEventListener("click", handleCamera);
camerasSelect.addEventListener("input", handleSelectCamera);

function makeConnection() {
  myPeerConnection = new RTCPeerConnection();
  // iceServers: [   Stun 구글 무료 서버 같은 공유 주소를 맞춰줘야함
  //   {
  //     urls:[
  //       "stun:stun.l.google.com:19302",
  //       "stun:stun1.l.google.com:19302",
  //       "stun:stun2.l.google.com:19302",
  //       "stun:stun3.l.google.com:19302",
  //       "stun:stun4.l.google.com:19302",
  //     ]
  //   }
  // ]
  myPeerConnection.addEventListener("icecandidate", handleIce);
  myPeerConnection.addEventListener("addstream", handleAddStream);
  myStream
    .getTracks()
    .forEach((track) => myPeerConnection.addTrack(track, myStream));
}

async function initMedia() {
  welcome.hidden = true;
  call.hidden = false;
  await getMedia();
  makeConnection();
}

async function handleSubmit(event) {
  event.preventDefault();
  const input = welcome.querySelector("input");
  await initMedia();
  socket.emit("join_room", input.value);
  roomName = input.value;
  input.value = "";
}

welcomeForm = welcome.querySelector("form");
welcomeForm.addEventListener("submit", handleSubmit);

socket.on("welcome", async () => {
  myDataChannel = myPeerConnection.createDataChannel("chat");
  myDataChannel.addEventListener("message", (event) => {
    console.log(event.data);
  });
  console.log("someone joined");
  const offer = await myPeerConnection.createOffer();
  myPeerConnection.setLocalDescription(offer);
  socket.emit("offer", offer, roomName);
});
socket.on("offer", async (offer) => {
  myPeerConnection.addEventListener("datachannel", (event) => {
    myDataChannel = event.channel;
    myDataChannel.addEventListener("message", (event) => {
      console.log(event.data);
    });
  });
  myPeerConnection.setRemoteDescription(offer);
  const answer = await myPeerConnection.createAnswer();
  myPeerConnection.setLocalDescription(answer);
  socket.emit("answer", answer, roomName);
});

socket.on("answer", (answer) => {
  myPeerConnection.setRemoteDescription(answer);
});

socket.on("ice", (ice) => {
  myPeerConnection.addIceCandidate(ice);
});

function handleIce(data) {
  socket.emit("ice", data.candidate, roomName);
}

function handleAddStream(data) {
  const peerFace = document.querySelector("#peerFace");
  peerFace.srcObject = data.stream;
}
