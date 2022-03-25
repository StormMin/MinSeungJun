const express = require("express");

const app = express();
const port = process.env.PORT || 5000;
const db = require("./server/config/db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const multer = require("multer");
const upload = multer({ dest: "./uploads" });

app.get("/api/customers", (req, res) => {
  db.query("SELECT * FROM customers Where isDeleted=0", (err, data) => {
    if (err) throw err;
    // console.log("User info is: ", data);
    res.send(data);
  });
});

app.use("/image", express.static("./uploads"));

app.post("/api/customers", upload.single("image"), (req, res) => {
  let sql =
    "INSERT INTO customers (image_url,name,age,createTime) VALUES (?,?,?,now())";
  let image = `http://localhost:${port}/image/` + req.file.filename;
  let name = req.body.name;
  let age = req.body.age;
  let params = [image, name, age];
  db.query(sql, params, function (err, rows, fields) {
    res.send(rows);
    if (err) console.log(err);
    else console.log(rows.insertId);
  });
});

app.delete("/api/customers/:id", (req, res) => {
  let sql =
    "UPDATE customers SET isDeleted=1,deleteTime=now() Where Customers_id=?";
  let params = [req.params.id];
  db.query(sql, params, function (err, rows, fields) {
    res.send(rows);
    if (err) console.log(err);
    else console.log(rows.insertId);
  });
});

app.listen(port, () =>
  console.log(`Listening on port  http://localhost:${port}`)
);
