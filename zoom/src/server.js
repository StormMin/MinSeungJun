import http from "http";
// import WebSocket from "ws";
import express from "express";
import socketIO from "socket.io";
const app = express();
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
console.log("hi");

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res, next) => res.render("home"));
app.get("/*", (req, res, next) => res.redirect("/"));
const listenHandler = () => console.log(`Lisening on http://localhost:3000/`);

const httpServer = http.createServer(app);
const wsServer = socketIO(httpServer);

wsServer.on("connection", (socket) => {
  socket.on("room", (msg, backend) => {
    console.log(msg);
    setTimeout(() => {
      backend("backend says");
    }, 1000);
  });
});
httpServer.listen(3000, listenHandler);
