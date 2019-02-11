// index.js

var http = require('http');
var https = require('https');
var fs = require('fs');
var port = process.env.PORT || 8080;

http.createServer(function (req, res) {
	fs.readFile("board.html",function(err,data) {
		if(!err) {
			res.writeHead(200, {'Content-Type': ('text/html')});
			res.write(data,function() {
				res.end();
			});
		} else {
			res.writeHead(500, {'Content-Type': 'text/html'});
			res.write("<html><body style='font-family:Verdana;font-size:5vw;font-weight:bold;'>500<br>Internal Server Error<br><br>" + err + "</body></html>", function() {
				res.end();
			});
		}
	});
}).listen(port);
