const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
  host: "sql8.freesqldatabase.com",
  user: "sql8570664",
  password: "yxiZJHI9cH",
  database: "sql8570664",
  multipleStatements: true,
});

module.exports = mysqlConnection;
