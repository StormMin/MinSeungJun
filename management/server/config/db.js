const mysql = require("mysql");
let db = mysql.createPool({
  host: "localhost",
  port: "????",
  user: "root",
  password: "secret",
  database: "mydatabase",
});

module.exports = db;
