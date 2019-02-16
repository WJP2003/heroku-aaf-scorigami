// index.js

var http = require('http');
var https = require('https');
var fs = require('fs');
var port = process.env.PORT || 8080;

http.createServer(function (req, res) {
	getData();
	fs.readFile("board.html",function(err,data) {
		if(req.url != "/favicon.ico") {
			res.writeHead(200, {'Content-Type': ('text/html')});
			res.write(data,function() {
				fs.readFile("scores.txt",function(err2,data2) {
					if(!err2) {
						res.write(data2 + "]; var klosing = 0; var kwinning = 0; for(var i = 0;i < arr.length;i++) { klosing = (Math.min(arr[i][0],arr[i][1]) > klosing ? Math.min(arr[i][0],arr[i][1]) : klosing); kwinning = (Math.max(arr[i][0],arr[i][1]) > kwinning ? Math.max(arr[i][0],arr[i][1]) : kwinning); var a = document.getElementsByClassName('col' + Math.max(arr[i][0],arr[i][1]) + ' row' + Math.min(arr[i][0],arr[i][1]))[0]; a.classList.remove('never'); a.className += (arr[i][4] == 'Preseason' ? ' happened-pre' : ' happened-reg'); } for(var i = document.getElementsByClassName('main')[0].lastElementChild.lastElementChild.lastElementChild.innerHTML;i > klosing;i--) { document.getElementsByClassName('main')[0].lastElementChild.lastElementChild.remove() } </script></html>",function() {
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

var getData = function() {
        https.get('https://noextrapoints.com/', function(resp) {
                var data = '';

                resp.on('data',function(chunk) {
                        data += chunk;
                });

                resp.on('end',function() {
                        var s1 = data.split("</nav>")[1];
                        var s2 = s1.split("<div class=\"card scoreboard p-6\">");
                        s2[s2.length-1] = s2[s2.length-1].split("<!-- close the section -->")[0];
                        s2.shift();

                        var s3 = s2;
                        for(var i = 0;i < s3.length;i++) {
                                s3[i] = s3[i].split("<div class=\"flex items-center justify-between\">");

                                s3[i][2] = "\"" + s3[i][0].slice(s3[i][0].indexOf("<h2>")+4,s3[i][0].indexOf("</h2>",s3[i][0].indexOf("<h2>"))) + "\"";
                                s3[i][3] = "\"" + s3[i][1].slice(s3[i][1].indexOf("<h2>")+4,s3[i][1].indexOf("</h2>",s3[i][1].indexOf("<h2>"))) + "\"";

                                s3[i][0] = s3[i][0].split("</h3>")[0];
                                s3[i][0] = s3[i][0].split(">");
                                s3[i][0] = s3[i][0][s3[i][0].length-1];

                                var garble = s3[i][1].split("</h3>")[1].split("<a href=\"/boxscores/")[1].split("-");
                                if(garble[0] == "preseason") {
                                        s3[i][4] = "\"Preseason\"";
                                        s3[i][5] = garble[2]; // week #
                                } else {
                                        s3[i][4] = "\"Regular Season\"";
                                        s3[i][5] = garble[1]; // week #
                                }

                                s3[i][1] = s3[i][1].split("</h3>")[0];
                                s3[i][1] = s3[i][1].split(">");
                                s3[i][1] = s3[i][1][s3[i][1].length-1];
                        }

                        var s9 = "[" + s3.join("],\n [") + "]";
                        console.log(s9);
                        fs.writeFile("scores.txt",s9,function() {
                                console.log("File saved.");
                        });
                });
        });
};
getData();
