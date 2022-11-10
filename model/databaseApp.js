const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "social_app",
  multipleStatements: true,
});

module.exports = mysqlConnection;
