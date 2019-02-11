// index.js

var http = require('http');
var https = require('https');
var fs = require('fs');
var port = process.env.PORT || 8080;

http.createServer(function (req, res) {
	fs.readFile("board.html",function(err,data) {
		if(req.url != "/favicon.ico") {
			res.writeHead(200, {'Content-Type': ('text/html')});
			res.write(data,function() {
				fs.readFile("scores.txt",function(data2) {
					if(!err2) {
						console.log(data2.join(","));
						res.write(data + data2,function() {
							res.end();
						});
					} else {
						console.log("Error 2");
						res.write("error",function() {
							res.end();
						});
					}
				});
			});
		} else {
			res.writeHead(404);
		}
	});
}).listen(port);

(function() {
        https.get('https://en.wikipedia.org/wiki/Template:2019_AAF_schedule', function(resp) {
                var data = '';

                resp.on('data',function(chunk) {
                        data += chunk;
                });

                resp.on('end',function() {
                        var s4 = [];
                        for(var i = 0;i != -1;i = data.indexOf(" season\"> ",i+1)) {
                                var s1 = data.slice(data.indexOf(" season\"> ",i)+10,data.length);
                                var s2 = s1.slice(0,s1.indexOf("</a>"));
                                var s3 = s2.split("–");
                                s4.push(s3);
                        }
                        s4.shift();
                        var s5 = [];
                        for(var i = 0;i < s4.length;i++) {
                                if(s4[i] != 'v' && (s4[i][0] > s4[i][1])) {
                                        s5.push(s4[i]);
                                }
                        }
                        fs.writeFile("scores.txt",s5,function() {
				console.log("File saved.");
			});
                });
        });
})();
