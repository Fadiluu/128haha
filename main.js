var http = require('http')
var fs = require('fs')
var url = require('url')
var querystring = require('querystring');
var myModule = require('./myModule');
var mySess = require('./mySession');

http.createServer(function(req, res) {
    var body='';
    var s;

    if (req.url =="/register"){

        req.on('data', function(chunk){
            body+=chunk.toString();
        });

        req.on('end', ()=>{
            body = querystring.parse(body);

            myModule.registerUser(res,body,myModule.login)
        })
    }else{
        fs.readFile('reg.html', function(err,data){
            res.writeHead(200,{'Content-Type': 'text/html'})
            res.write(data)
            res.end();
        })
    }

}).listen(8080, () => console.log('Server is listening on port 8080'));
