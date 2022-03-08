import http from "http";
import WebSocket from "ws";
import express from "express";
const app = express();
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
console.log("hi");

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res, next) => res.render("home"));
app.get("/*", (req, res, next) => res.redirect("/"));
const listenHandler = () => console.log(`Lisening on http://localhost:3000/`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const sockets = [];
wss.on("connection", (socket) => {
  socket["nickname"] = "Anon";
  sockets.push(socket);
  socket.on("message", (message) => {
    const parsed = JSON.parse(message);
    switch (parsed.type) {
      case "new_message":
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.nickname}: ${parsed.payload}`)
        );
      case "nick":
        socket["nickname"] = parsed.payload;
    }
  });
  socket.on("close", () => {
    console.log("Disconnected from Browser 📕");
  });
});
server.listen(3000, listenHandler);
