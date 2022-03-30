const mysql = require("mysql");
require("dotenv").config();
let db = mysql.createPool({
  host: "localhost",
  port: process.env.DATABASE_PORT,
  user: "root",
  password: process.env.DATABASE_PASSWORD,
  database: "mydatabase",
});

module.exports = db;
