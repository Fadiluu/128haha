// This Node.js file is used to create the project database.
// @author Dr. Haitham Yaish
// @date 11 June 2023
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin" // provide your own password.
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    // Create database communic8_db.
    var sql_database = "CREATE DATABASE communic8_db";
    con.query(sql_database, function (err, result) {
        if (err) throw err;
        console.log("communic8_db Database Created");
    });
});
