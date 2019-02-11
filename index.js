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
				fs.readFile("scores.txt",function(err2,data2) {
					if(!err2) {
						res.write(data2 + "]; for(var i = 0;i < arr.length;i++) { document.getElementById('js2').innerHTML += ('.col' + arr[i][0] + '.row' + arr[i][1] + ' { background: #99FF99 } \\n') } </script></html>",function() {
							res.end();
						});
					} else {
						res.write("Error",function() {
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
			for(var i = 0;i < s5.length;i++) {
				if(s5[i][1] > s5[i][0]) {
					s5[i][1] = [s5[i][0], s5[i][0] = s5[i][1]][0];
					// b = [a, a = b][0];
				}
			}
			s5 = "[" + s5.join("],[") + "]";
                        fs.writeFile("scores.txt",s5,function() {
				console.log("File saved.");
			});
                });
        });
})();
