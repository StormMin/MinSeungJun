const mysql = require("mysql");
let db = mysql.createPool({
  host: "localhost",
  port: process.env.port,
  user: "root",
  password: process.env.password,
  database: "mydatabase",
});

module.exports = db;
