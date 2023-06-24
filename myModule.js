var mysql = require('mysql');
var fs = require('fs');
var con;
exports.connectToDB = function(){
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "admin",
        database:"communic8_db" // provide your own password.
    });
    return con;
}

exports.registerUser = function(res,body,Callback){
        fname=body.fname;
        lname=body.lname;
        email=body.email;
        dob = body.dob;
        password=body.password;
        phone = body.phone;
    con = this.connectToDB();
    con.connect(function(err){
        if(err) throw err;
        var sql = "Insert INTO user(email,f_name,l_name,dob,emp_password,phone_number) VALUES('"+email+"','"+fname+"','"+lname+"','"+dob+"','"+password+"',"+phone+");"
        con.query(sql, function(err,result){
            if (err) throw err;
            console.log("Inserted data");
            Callback(res)
        })
    })
    Callback(res);
}
// for login
exports.login = function (res) { 
    fs.readFile("login.html", function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("404 Not Found");
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
};

// for logout
exports.logout = function (res) {
    fs.readFile("path to login page", function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        if (con != undefined && con != "") {
            con.destroy();
        }        
        return res.end();
    });
};

// 

exports.navigateToHome = function(res,mySess){
    fs.readFile("path",function(err,data){
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write(data)
        return res.end()
    })
};
exports.navigateToSubscriptions = function(res,mySess) { 
    fs.readFile('path',function(err,data){
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    })
};
exports.getSubcriptions = function(res,mySess,Callback){

    //call back is  navigate to subscription
}

exports.preAuthentication = function(res,body,mySess,Callback){

    // call back is post authentication 
}

exports.postAuthentication = function(res,mySess,body,resultofthesql,Callback){

    //do everthing to sett authentication
    
    // for testing instead of call back to get plans u can directly redirect to home page
    //call back to getplans
}

exports.getPlans = function (req,mySess,Callback){
    //call back is to navigat to home
}