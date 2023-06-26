var http = require('http')
var fs = require('fs')
var url = require('url')
var querystring = require('querystring');
var myModule = require('./myModule');
var mySess = require('./mySession');

http.createServer(function(req, res) {
    var body='';
    var s;

    if (req.url ==="/register"){
        req.on('data', function(chunk){
            body+=chunk.toString();

        });

        req.on('end', ()=>{
            body = querystring.parse(body);
            myModule.registerUser(res,body,myModule.login)
        })
    }else if(req.url === "/login"){
        req.on('data', function(chunk){
            body+=chunk.toString();
        });

        req.on('end', function(){
            body = querystring.parse(body);

            myModule.preAuthentication(res,body,mySess,myModule.postAuthentication,myModule.navigateToHome)
        })

    }else if(req.url === "/logout"){
        s = mySess.getSession();
        if (s !== undefined) {
            if (s.email != "" && s.email !== undefined) {
                mySess.deleteSession();
            }
        } else {
            // Redirect to the login page.
            myModule.login(res);
        }
        myModule.logout(res);
    }else if(req.url==="/subscribe"){
        req.on('data', function(chunk){
            body+=chunk.toString();

        });

        req.on('end', ()=>{
            body = querystring.parse(body);
            myModule.addPlan(res,body,mySess)
        })
    }else if(req.url == "/subscriptions"){
        s = mySess.getSession();
        if (s !== undefined) {
            if (s.email != "" && s.email !== undefined) {
                myModule.getSubscriptions(res, s, myModule.navigateToSubscriptions);
            }
        }
    }else if(req.url === "/goregister"){
        myModule.navigateToRegister(res);
    }
    else{
        myModule.login(res);
        // fs.readFile('reg.html', function(err,data){
        //     res.writeHead(200,{'Content-Type': 'text/html'})
        //     res.write(data)
        //     res.end();
        // })
    }
}).listen(8080, () => console.log('Server is listening on port 8080'));
