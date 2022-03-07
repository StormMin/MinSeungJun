import express from "express";
const app = express();
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
console.log("hi");

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res, next) => res.render("home"));
app.get("/*", (req, res, next) => res.redirect("/"));
const listenHandler = () => console.log(`Lisening on http://localhost:3000/`);
app.listen(3000, listenHandler);
