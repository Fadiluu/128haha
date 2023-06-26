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
        console.log('Connected to database')
        if(err) throw err;
        sql= 'SELECT email FROM user WHERE email ="'+email+'"'
        con.query(sql,function(err,result){
            if (err) throw err
            if(result === undefined ){
                var sql = "Insert INTO user(email,f_name,l_name,dob,emp_password,phone_number) VALUES('"+email+"','"+fname+"','"+lname+"','"+dob+"','"+password+"',"+phone+");"
                con.query(sql, function(err,result){
                    if (err) throw err;
                    console.log("Inserted data");
                    Callback(res)
                })
                }else{
                    var message = "<script>document.getElementById(\"email__taken\").innerHTML = \"Email Address Already Taken!<br>\";</script> "
                    fs.readFile('reg.html', function(err,data){
                        res.writeHead(200,{'Content-Type': 'text/html'})
                        res.write(data)
                        res.end(message);
                    })
                }
        })
    })
    // con.destroy();
    // Callback(res);
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
    
    fs.readFile("login.html", function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        con.destroy();
        return res.end();
    });
};
exports.navigateToRegister = function (res){
    fs.readFile('reg.html', function(err,data){
        res.writeHead(200,{'Content-Type': 'text/html'})
        res.write(data)
        res.end();
    })
}

// 

exports.navigateToSubscriptions = function(res,mySess) { 
    fs.readFile('path',function(err,data){
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    })
};

exports.preAuthentication = function(res,body,mySess,Callback1,Callback2){
    var userEmail = body.email;
    var userPassword = body.password;
    con= this.connectToDB();
    con.connect(function(err){
        if(err) throw err;

        var sql = "SELECT * FROM user WHERE email='"+userEmail+"' AND emp_password='"+userPassword+"'";
        con.query(sql,function(err,result){
            if(err) throw err;
            if(result !==undefined && result.length > 0){
                Callback1(res, mySess, result[0].email, body,Callback2)
            }else{
                var message = "<script>document.getElementById(\"error_message\").innerHTML = \"You have entered an incorrect username or password!<br>\";</script> ";
                fs.readFile("login.html", function (err, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    return res.end(message);                       
                });
            }
        })
    })
    // call back is post authentication 

}

exports.postAuthentication = function(res,mySess,email,body,Callback) {
    if(email !== undefined && email.length > 0 ) {
        mySess.setSession(email);
        s = mySess.getSession();
        if(s.email != "" && s.email !== undefined){
            // fs.readFile("index.html", function (err, data) {
            //     res.writeHead(200, { 'Content-Type': 'text/html' });
            //     res.write(data);
            //     return res.end();
            // });
            // con.connect(function(err){
            //     if(err) throw err;
                var arr = [];
                var sql1 = "SELECT p.plan_name , data, price ,voice, subscription_period FROM plan p , pre_paid_plan pre WHERE p.plan_name = pre.plan_name ";
                con.query(sql1,function(err,result){
                    if(err) throw err;
                    arr[0] =result

                    // console.log(arr[0])
                })
                var sql2 = "SELECT p.plan_name , data, price ,voice, subscription_period FROM plan p , post_paid_plan post WHERE p.plan_name = post.plan_name ";
                con.query(sql2,function(err,result){
                    if(err) throw err;
                    arr[1]= result
                })
                var sql3 = "SELECT p.plan_name ,data,speed,router,delivery, price , subscription_period FROM plan p ,  home_internet_plan hom  WHERE p.plan_name = hom.plan_name ";
                con.query(sql3,function(err,result){
                    if(err) throw err;
                    arr[2]= result
                })
                var sql4 = "SELECT p.plan_name , channels, price , subscription_period FROM plan p , tv_package_plan tv WHERE p.plan_name = tv.plan_name ";
                con.query(sql4,function(err,result){
                    if(err) throw err;
                    arr[3]= result
                    Callback(res, arr)
                })
            // })
            
        }

    }
    //do everthing to sett authentication  
    // for testing instead of call back to get plans u can directly redirect to home page
    //call back to getplans
}
exports.navigateToHome = function(res,message){
    fs.readFile("index.html",function(err,data){
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write(data)
        res.write('<script>')
        for(i=0; i< message.length; i++){
            
            //pre paid
            res.write("document.querySelectorAll(\".pre__paid--card\")\["+i+"\].innerHTML += '<h3>" + message[0][i].plan_name + "</h3>';" + "\n");
            res.write("document.querySelectorAll(\".pre__paid--card\")\["+i+"\].innerHTML += '<h3>Data</h3>';" + "\n");
            res.write("document.querySelectorAll(\".pre__paid--card\")\["+i+"\].innerHTML += '<p>" + message[0][i].data + "</p>';" + "\n");
            res.write("document.querySelectorAll(\".pre__paid--card\")\["+i+"\].innerHTML += '<h3>Voice</h3>';" + "\n");
            res.write("document.querySelectorAll(\".pre__paid--card\")\["+i+"\].innerHTML += '<p>" + message[0][i].voice + "</p>';" + "\n");
            res.write("document.querySelectorAll(\".pre__paid--card\")\["+i+"\].innerHTML += '<h3>Price</h3>';" + "\n");  
            res.write("document.querySelectorAll(\".pre__paid--card\")\["+i+"\].innerHTML += '<p>" + message[0][i].price + "</p>';" + "\n");  
            res.write("document.querySelectorAll(\".pre__paid--card\")\["+i+"\].innerHTML += '<h3>Subscription Period</h3>';" + "\n");  
            res.write("document.querySelectorAll(\".pre__paid--card\")\["+i+"\].innerHTML += '<p>" + message[0][i].subscription_period + "</p>';" + "\n");
            res.write("document.querySelectorAll(\".pre__paid--card\")\["+i+"\].innerHTML +='<div class=\"sub__btn--right\"><input class=\"subscription__btn\" type=\"submit\" value=\"Subscribe\"></div>';");
            res.write("document.querySelectorAll(\".pre__paid--card\")\["+i+"\].innerHTML += '<input type=\"hidden\" name=\"plan_name\" value=\""+message[0][i].plan_name+"\">';" + "\n");
            
            //post paid
            res.write("document.querySelectorAll(\".post__paid--card\")\["+i+"\].innerHTML += '<h3>" + message[1][i].plan_name + "</h3>';" + "\n")
            res.write("document.querySelectorAll(\".post__paid--card\")\["+i+"\].innerHTML += '<h3>Data</h3>';" + "\n");
            res.write("document.querySelectorAll(\".post__paid--card\")\["+i+"\].innerHTML += '<p>" + message[1][i].data + "</p>';" + "\n");
            res.write("document.querySelectorAll(\".post__paid--card\")\["+i+"\].innerHTML += '<h3>Voice</h3>';" + "\n");
            res.write("document.querySelectorAll(\".post__paid--card\")\["+i+"\].innerHTML += '<p>" + message[1][i].voice + "</p>';" + "\n");  
            res.write("document.querySelectorAll(\".post__paid--card\")\["+i+"\].innerHTML += '<h3>Price</h3>';" + "\n");  
            res.write("document.querySelectorAll(\".post__paid--card\")\["+i+"\].innerHTML += '<p>" + message[1][i].price + "</p>';" + "\n");  
            res.write("document.querySelectorAll(\".post__paid--card\")\["+i+"\].innerHTML += '<h3>Subscription Period</h3>';" + "\n");  
            res.write("document.querySelectorAll(\".post__paid--card\")\["+i+"\].innerHTML += '<p>" + message[1][i].subscription_period + "</p>';" + "\n");
            res.write("document.querySelectorAll(\".post__paid--card\")\["+i+"\].innerHTML +='<div class=\"sub__btn--right\"><input class=\"subscription__btn\" type=\"submit\" value=\"Subscribe\"></div>';");
            res.write("document.querySelectorAll(\".post__paid--card\")\["+i+"\].innerHTML += '<input type=\"hidden\" name=\"plan_name\" value=\""+message[1][i].plan_name+"\">';" + "\n");
        
            
            //Home internet
            res.write("document.querySelectorAll(\".wifi__card\")\["+i+"\].innerHTML += '<h3>" + message[2][i].plan_name + "</h3>';" + "\n");
            res.write("document.querySelectorAll(\".wifi__card\")\["+i+"\].innerHTML += '<h3>Data</h3>';" + "\n");
            res.write("document.querySelectorAll(\".wifi__card\")\["+i+"\].innerHTML += '<p>" + message[2][i].data + "</p>';" + "\n");  
            res.write("document.querySelectorAll(\".wifi__card\")\["+i+"\].innerHTML += '<h3>Speed</h3>';" + "\n");
            res.write("document.querySelectorAll(\".wifi__card\")\["+i+"\].innerHTML += '<p>" + message[2][i].speed + "</p>';" + "\n");  
            res.write("document.querySelectorAll(\".wifi__card\")\["+i+"\].innerHTML += '<h3>Router</h3>';" + "\n");
            res.write("document.querySelectorAll(\".wifi__card\")\["+i+"\].innerHTML += '<p>" + message[2][i].router + "</p>';" + "\n");  
            res.write("document.querySelectorAll(\".wifi__card\")\["+i+"\].innerHTML += '<h3>Delivery</h3>';" + "\n");
            res.write("document.querySelectorAll(\".wifi__card\")\["+i+"\].innerHTML += '<p>" + message[2][i].delivery + "</p>';" + "\n");  
            res.write("document.querySelectorAll(\".wifi__card\")\["+i+"\].innerHTML += '<h3>Price</h3>';" + "\n");  
            res.write("document.querySelectorAll(\".wifi__card\")\["+i+"\].innerHTML += '<p>" + message[2][i].price + "</p>';" + "\n");  
            res.write("document.querySelectorAll(\".wifi__card\")\["+i+"\].innerHTML += '<h3>Subscription Period</h3>';" + "\n");  
            res.write("document.querySelectorAll(\".wifi__card\")\["+i+"\].innerHTML += '<p>" + message[2][i].subscription_period + "</p>';" + "\n");
            res.write("document.querySelectorAll(\".wifi__card\")\["+i+"\].innerHTML +='<div class=\"sub__btn--right\"><input class=\"subscription__btn\" type=\"submit\" value=\"Subscribe\"></div>';");
            res.write("document.querySelectorAll(\".wifi__card\")\["+i+"\].innerHTML += '<input type=\"hidden\" name=\"plan_name\" value=\""+message[2][i].plan_name+"\">';" + "\n");
            
            //tv package
            res.write("document.querySelectorAll(\".tv__card\")\["+i+"\].innerHTML += '<h3>" + message[3][i].plan_name + "</h3>';" + "\n");
            res.write("document.querySelectorAll(\".tv__card\")\["+i+"\].innerHTML += '<h3>Channels</h3>';" + "\n");
            res.write("document.querySelectorAll(\".tv__card\")\["+i+"\].innerHTML += '<p>" + message[3][i].channels + "</p>';" + "\n");  
            res.write("document.querySelectorAll(\".tv__card\")\["+i+"\].innerHTML += '<h3>Price</h3>';" + "\n");  
            res.write("document.querySelectorAll(\".tv__card\")\["+i+"\].innerHTML += '<p>" + message[3][i].price + "</p>';" + "\n");  
            res.write("document.querySelectorAll(\".tv__card\")\["+i+"\].innerHTML += '<h3>Subscription Period</h3>';" + "\n");  
            res.write("document.querySelectorAll(\".tv__card\")\["+i+"\].innerHTML += '<p>" + message[3][i].subscription_period + "</p>';" + "\n");
            res.write("document.querySelectorAll(\".tv__card\")\["+i+"\].innerHTML +='<div class=\"sub__btn--right\"><input class=\"subscription__btn\" type=\"submit\" value=\"Subscribe\"></div>';");
            res.write("document.querySelectorAll(\".tv__card\")\["+i+"\].innerHTML += '<input type=\"hidden\" name=\"plan_name\" value=\""+message[3][i].plan_name+"\">';" + "\n");

        }
        res.write('</script>')
        return res.end();
    })
}

exports.addPlan = function(res,body,mySess){
    plan_name = body.plan_name
    s = mySess.getSession();
    if(s.email !== undefined && s.email != ""){
        var sql = "INSERT INTO subscription VALUES ('"+s.email+"','"+plan_name+"')";
        con.query(sql,function(err,result){
            if (err) throw err;
            console.log('Plan added');
        })
    }
}

exports.navigateToSubscriptions = function(res,results,mySess) { 
    console.log('hoi');
    fs.readFile('subscriptions.html',function(err,data){
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.write("<script>");
       
        //post paid plans
        if(results[0] != null){
            var post_paid_plans = results[0];
            var post_paid_plan = post_paid_plans[0];
            res.write("document.getElementById(\"post-paid-name\").innerHTML += '" + post_paid_plan.name + "';");
            res.write("document.getElementById(\"post-paid-data\").innerHTML += '" + post_paid_plan.data + "';");
            res.write("document.getElementById(\"post-paid-voice\").innerHTML += '" + post_paid_plan.voice + "';");
            res.write("document.getElementById(\"post-paid-price\").innerHTML += '" + post_paid_plan.price + "';");
            res.write("document.getElementById(\"post-paid-subscription-period\") += '" + post_paid_plan.subscription_period + "';");
        }

        //pre paid plans
        if(results[1] != null){
        var pre_paid_plans = results[1];
        var pre_paid_plan = pre_paid_plans[0];
            for(var j = 0; j < result.length; j++){
                res.write("");
                res.write("document.getElementById(\"pre-paid-name\").innerHTML += '" + pre_paid_plan.name + "';");
                res.write("document.getElementById(\"pre-paid-data\").innerHTML += '" + pre_paid_plan.data + "';"); 
                res.write("document.getElementById(\"pre-paid-voice\").innerHTML += '" + pre_paid_plan.voice + "';");
                res.write("document.getElementById(\"pre-paid-price\").innerHTML += '" + pre_paid_plan.price + "';");
                res.write("document.getElementById(\"pre-paid-subscription-period\").innerHTML += '" + pre_paid_plan.subscription_period + "';");
            }
        }

        //home internet
        if(results[2] != null){
        var home_internet_plans = results[2];
        var home_internet_plan = home_internet_plans[0];
            for(var j = 0; j < result.length; j++){
                res.write("");
                res.write("document.getElementById(\"home-internet-name\").innerHTML += '" + home_internet_plan.name + "';");
                res.write("document.getElementById(\"home-internet-data\").innerHTML += '" + home_internet_plan.data + "';");
                res.write("document.getElementById(\"home-internet-voice\").innerHTML += '" + home_internet_plan.speed + "';");
                res.write("document.getElementById(\"home-internet-router\").innerHTML += '" + home_internet_plan.router + "';");
                res.write("document.getElementById(\"home-internet-delivery\").innerHTML += '" + home_internet_plan.delivery + "';");
                res.write("document.getElementById(\"home-internet-price\").innerHTML += '" + home_internet_plan.price + "';");
                res.write("document.getElementById(\"home-internet-subscription-period\").innerHTML += '" + home_internet_plan.subscription_period + "';");
            }
        }

        //tv packages
        if(results[3] != null){
            var tv_package_plans = results[3];
            for(var i = 0; i < tv_package_plans.length; i++){
                var tv_package_plan = tv_package_plans[i];
                for(var j = 0; j < tv_package_plan.length; j++){
                    /*
                    res.write("document.getElementById(\"tv_package-name\").innerHTML += '" + tv_package_plan[i].name + "';");
                    res.write("document.getElementById(\"tv_package-paid-channels\").innerHTML += " + tv_package_plan[i].channels + "';");
                    res.write("document.getElementById(\"tv_package-paid-price\").innerHTML += " + tv_package_plan[i].price + "';");
                    res.write("document.getElementById(\"tv_package-subscription-period\").innerHTML += " + tv_package_plan[i].subscription_period + "';");
                    */
                    res.write("document.querySelector(\".tv-packages\").innerHTML += \"<div class=\"record\"><p>'" + tv_package_plan[i].name +
                    "Channels: '" + tv_package_plan[i].channels + "'&emsp;" +
                    "Price: : '" + tv_package_plan[i].price + "'&emsp;" +
                    "Subscription period: '" + tv_package_plan[i].subscription_period + "'</p>;");
                }
            }
        }
        res.write("</script>");
        res.end();

        

        //make place holders in html itself with ids and then use that
    })
};
exports.getSubscriptions = function(res,mySess,Callback){

    var results = new Array(4);

    var sql1 = "SELECT p.plan_name, postp.data, postp.voice, p.price, p.subscription_period from " +  
    "user u join subscription s on u.email = s.email " +
    "join plan p on s.plan_name = p.plan_name " +
    "join post_paid_plan postp on p.plan_name = postp.plan_name WHERE u.email = '" + mySess.email+"'";
    con.query(sql1, function (err, result_1) {
        if (err) throw err;
        if (result_1 !== undefined && result_1.length > 0) {
            results[0] = result_1;
            //myCallback(res, result, mySess); // result - employee object
        }
    });

    var sql2 = "SELECT p.plan_name, prep.data, prep.voice, p.price, p.subscription_period from " +  
    "user u join subscription s on u.email = s.email " +
    "join plan p on s.plan_name = p.plan_name " +
    "join pre_paid_plan prep on p.plan_name = prep.plan_name WHERE u.email = '" + mySess.email+"'";
    con.query(sql2, function (err, result_2) {
        if (err) throw err;
        if (result_2 !== undefined && result_2.length > 0) {
            results[1] = result_2;
            //myCallback(res, result, mySess); // result - employee object
        }
    });

    var sql3 = "SELECT p.plan_name, hp.data, hp.speed, hp.router, hp.delivery, p.price, p.subscription_period from " +  
    "user u join subscription s on u.email = s.email " +
    "join plan p on s.plan_name = p.plan_name " +
    "join home_internet_plan hp on p.plan_name = hp.plan_name WHERE u.email = '" + mySess.email+"'";
    con.query(sql3, function (err, result_3) {
        if (err) throw err;
        if (result_3 !== undefined && result_3.length > 0) {
            results[2] = result_3;
            //myCallback(res, result, mySess); // result - employee object
        }
    });

    var sql4 = "SELECT p.plan_name, tp.channels, p.price, p.subscription_period from " +  
    "user u join subscription s on u.email = s.email " +
    "join plan p on s.plan_name = p.plan_name " +
    "join tv_package_plan tp on p.plan_name = tp.plan_name WHERE u.email = '" + mySess.email+"'";
    con.query(sql4, function (err, result_4) {
        if (err) throw err;
        if (result_4 !== undefined && result_4.length > 0) {
            results[3] = result_4;
        
            Callback(res,results,mySess);
            //myCallback(res, result, mySess); // result - employee object
        }
    });
    //pass array to callback
    //call back is  navigate to subscription
    
}