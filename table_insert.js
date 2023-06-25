var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",   // provide your own password.
    database: "communic8_db" 
});

con.connect(function(err){
    if (err)throw err;
    console.log("Connected!");
    var sql_array = ["INSERT INTO plan (plan_name,price,subscription_period) VALUES ('Bronze Plan','100 AED','Monthly')",
              "INSERT INTO plan (plan_name,price,subscription_period) VALUES ('Flexi Plan','200 AED','Monthly')",
              "INSERT INTO plan (plan_name,price,subscription_period) VALUES ('Premium Plan','350 AED','Monthly')",
              "INSERT INTO plan (plan_name,price,subscription_period) VALUES ('Premium Plus','499 AED','Monthly')",
              "INSERT INTO plan (plan_name,price,subscription_period) VALUES ('Super Saver Plan','50 AED','30 days')",
              "INSERT INTO plan (plan_name,price,subscription_period) VALUES ('Power Plan','70 AED','28 days')",
              "INSERT INTO plan (plan_name,price,subscription_period) VALUES ('Ultra Flex Plan','100 AED','28 days')",
              "INSERT INTO plan (plan_name,price,subscription_period) VALUES ('Turbo Talk Plan','60 AED','30 days')",
              "INSERT INTO plan (plan_name,price,subscription_period) VALUES ('Smart Home','199 AED','Monthly')",
              "INSERT INTO plan (plan_name,price,subscription_period) VALUES ('Elite Home','299 AED','Monthly')",
              "INSERT INTO plan (plan_name,price,subscription_period) VALUES ('Prime Home','599 AED','Monthly')",
              "INSERT INTO plan (plan_name,price,subscription_period) VALUES ('Prime Plus','699 AED','Monthly')",
              "INSERT INTO plan (plan_name,price,subscription_period) VALUES ('English Package','49 AED','Monthly')",
              "INSERT INTO plan (plan_name,price,subscription_period) VALUES ('Asian Package','69 AED','Monthly')",
              "INSERT INTO plan (plan_name,price,subscription_period) VALUES ('Arabic Package','100 AED','Monthly')",
              "INSERT INTO plan (plan_name,price,subscription_period) VALUES ('Russian Package','150 AED','Monthly')"];
    for (i=0;i<sql_array.length;i++){
        var sql= sql_array[i];
    
    con.query(sql, function (err,results){
        if (err) throw err;
    });
    console.log("The record number " + (i+1) + " inserted into plan table" );
}
    var sql_array1 = ["INSERT INTO post_paid_plan (plan_name,data,voice) VALUES ('Bronze Plan','4 GB','100 Flexi mins')",
              "INSERT INTO post_paid_plan (plan_name,data,voice) VALUES ('Flexi Plan','8 GB','500 Flexi mins')",
              "INSERT INTO post_paid_plan (plan_name,data,voice) VALUES ('Premium Plan','32 GB','Unlimited voice(local)')",
              "INSERT INTO post_paid_plan (plan_name,data,voice) VALUES ('Premium Plus','64 GB','Unlimited voice(200 Flexi)')"];
    for (i=0;i<sql_array1.length;i++){
        var sql1= sql_array1[i];
    
    con.query(sql1, function (err,results){
        if (err) throw err;
    });
    console.log("The record number " + (i+1) + " inserted into post paid table" );
}
    var sql_array2 = ["INSERT INTO pre_paid_plan (plan_name,data,voice) VALUES ('Super Saver Plan','Unlimited data','20 local mins')",
                "INSERT INTO pre_paid_plan (plan_name,data,voice) VALUES ('Power Plan','1 GB/day data','30 local mins')",
                "INSERT INTO pre_paid_plan (plan_name,data,voice) VALUES ('Ultra Flex Plan','1 GB data','500 Flexi mins')",
                "INSERT INTO pre_paid_plan (plan_name,data,voice) VALUES ('Turbo Talk Plan','1 GB data','Unlimited voice')"];
    for (i=0;i<sql_array2.length;i++){
        var sql2= sql_array2[i];

    con.query(sql2, function (err,results){
    if (err) throw err;
    });
    console.log("The record number " + (i+1) + " inserted into pre paid table" );
}
    var sql_array3 = ["INSERT INTO home_internet_plan (plan_name,data,speed,router,delivery) VALUES ('Smart Home','Unlimited','Upto 250 Mbps','5G enabled router','Free Delivery')",
                "INSERT INTO home_internet_plan (plan_name,data,speed,router,delivery) VALUES ('Elite Home','Unlimited','Upto 500 Mbps','5G enabled router','Free Delivery')",
                "INSERT INTO home_internet_plan (plan_name,data,speed,router,delivery) VALUES ('Prime Home','Unlimited','Upto 1 Gbps','5G enabled router','Free Delivery')",
                "INSERT INTO home_internet_plan (plan_name,data,speed,router,delivery) VALUES ('Prime Plus','Unlimited','Upto 2 Gbps','5G enabled router','Free Delivery')"];
    for (i=0;i<sql_array3.length;i++){
        var sql3= sql_array3[i];

    con.query(sql3, function (err,results){
    if (err) throw err;
    });
    console.log("The record number " + (i+1) + " inserted into home internet table" );
    }
    var sql_array4 = ["INSERT INTO tv_package_plan (plan_name,channels) VALUES ('English Package','30+ Channels')",
                "INSERT INTO tv_package_plan (plan_name,channels) VALUES ('Asian Package','60+ Channels')",
                "INSERT INTO tv_package_plan (plan_name,channels) VALUES ('Arabic Package','100+ Channels')",
                "INSERT INTO tv_package_plan (plan_name,channels) VALUES ('Russian Package','80 Channels')"];
    for (i=0;i<sql_array4.length;i++){
        var sql4= sql_array4[i];

    con.query(sql4, function (err,results){
    if (err) throw err;
    });
    console.log("The record number " + (i+1) + " inserted into TV package table" );
    }
});