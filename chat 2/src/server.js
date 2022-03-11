import http from "http";
// import WebSocket from "ws";
import express from "express";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
const app = express();
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
console.log("hi");

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res, next) => res.render("home"));
app.get("/*", (req, res, next) => res.redirect("/"));
const listenHandler = () => console.log(`Lisening on http://localhost:3000/`);

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true,
  },
});

instrument(wsServer, {
  auth: false,
});

function publicRooms() {
  const {
    sockets: {
      adapter: { sids, rooms },
    },
  } = wsServer;
  const publicRooms = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  });
  return publicRooms;
}

function countRoom(roomName) {
  return wsServer.sockets.adapter.rooms.get(roomName)?.size;
}

wsServer.on("connection", (socket) => {
  socket["nickname"] = "Anon";
  socket.onAny((event) => {
    console.log(event);
  });
  socket.on("enter_Room", (msg, backend) => {
    socket.join(msg);
    backend();
    socket.to(msg).emit("welcome", socket["nickname"], countRoom(msg));
    wsServer.sockets.emit("updated_room", publicRooms());
  });
  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => {
      socket.to(room).emit("bye", socket["nickname"], countRoom(room) - 1);
    });
  });
  socket.on("disconnect", () => {
    wsServer.sockets.emit("updated_room", publicRooms());
  });
  socket.on("new_message", (msg, room, done) => {
    socket.to(room).emit("new_message", `${socket.nickname} : ${msg}`);
    done();
  });
  socket.on("nick", (nick) => {
    socket["nickname"] = nick;
  });
});
httpServer.listen(3000, listenHandler);
