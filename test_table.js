// This Node.js file is used to create the project database table.
// @author Dr. Haitham Yaish
// @date 11 June 2023

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",   // provide your own password.
    database: "communic8_db" 
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    // Create user table.
    var sql_table = "CREATE TABLE user (email VARCHAR(50) PRIMARY KEY, " + 
    "f_name VARCHAR(50)," +
    "l_name VARCHAR(50)," +
    "dob DATE," +
    "emp_password VARCHAR(50),"+
    "phone_number VARCHAR(50))" ;
    con.query(sql_table, function (err, result) {
        if (err) throw err;
        console.log("User Table created");
    });

    // Create plans table.
    var sql_table = "CREATE TABLE plan (plan_name VARCHAR(50)PRIMARY KEY, " + 
    "price DOUBLE," +
    "subscription_period VARCHAR(10))" ;
    con.query(sql_table, function (err, result) {
        if (err) throw err;
        console.log("Plan Table created");
    });

    // Create subscriptions table.
    var sql_table = "CREATE TABLE subscription (email VARCHAR(50), " + 
    "plan_name VARCHAR(50)," + 
    "PRIMARY KEY (email,plan_name),"+
    "FOREIGN KEY (email) " +
    "REFERENCES user (email) " +
    "ON DELETE NO ACTION " + 
    "ON UPDATE NO ACTION, " +
    "FOREIGN KEY (plan_name) " +
    "REFERENCES plan (plan_name) " +
    "ON DELETE NO ACTION " + 
    "ON UPDATE NO ACTION) ";
    con.query(sql_table, function (err, result) {
        if (err) throw err;
        console.log("Subscription Table created");
    });

    // Create post_paid_plan table.
    var sql_table = "CREATE TABLE post_paid_plan (plan_name VARCHAR(50) PRIMARY KEY, " + 
    "data VARCHAR(50)," + 
    "voice VARCHAR(50)," + 
    "FOREIGN KEY (plan_name) " +
    "REFERENCES plan (plan_name) " +
    "ON DELETE NO ACTION " + 
    "ON UPDATE NO ACTION) ";
    con.query(sql_table, function (err, result) {
        if (err) throw err;
        console.log("Postpaid Table created");
    });

    // Create pre_paid_plan table.
    var sql_table = "CREATE TABLE pre_paid_plan (plan_name VARCHAR(50)PRIMARY KEY, " + 
    "data VARCHAR(50)," + 
    "voice VARCHAR(50)," +
    "FOREIGN KEY (plan_name) " +
    "REFERENCES plan (plan_name) " +
    "ON DELETE NO ACTION " + 
    "ON UPDATE NO ACTION) ";
    con.query(sql_table, function (err, result) {
        if (err) throw err;
        console.log("Prepaid Table created");
    });

    // Create home_internet_plan table.
    var sql_table = "CREATE TABLE home_internet_plan (plan_name VARCHAR(50)PRIMARY KEY, " + 
    "name VARCHAR(50)," + 
    "data VARCHAR(50)," + 
    "speed VARCHAR(50)," + 
    "router VARCHAR(50)," + 
    "delivery VARCHAR(50)," + 
    "FOREIGN KEY (plan_name) " +
    "REFERENCES plan (plan_name) " +
    "ON DELETE NO ACTION " + 
    "ON UPDATE NO ACTION) ";
    con.query(sql_table, function (err, result) {
        if (err) throw err;
        console.log("HomeInternet Table created");
    });

    // Create tv_package_plan table.
    var sql_table = "CREATE TABLE tv_package_plan (plan_name VARCHAR(50)PRIMARY KEY, " + 
    "name VARCHAR(50)," + 
    "channels VARCHAR(50)," + 
    "FOREIGN KEY (plan_name) " + 
    "REFERENCES plan (plan_name) " +
    "ON DELETE NO ACTION " + 
    "ON UPDATE NO ACTION) ";
    con.query(sql_table, function (err, result) {
        if (err) throw err;
        console.log("TvPackages Table created");
    });

});
    