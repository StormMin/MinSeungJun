const express = require("express");

const app = express();
const port = process.env.PORT || 5000;
const db = require("./server/config/db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/customers", (req, res) => {
  db.query("SELECT * FROM customers", (err, data) => {
    if (err) throw err;
    console.log("User info is: ", data);
    res.send(data);
  });
});

app.listen(port, () =>
  console.log(`Listening on port  http://localhost:${port}`)
);
