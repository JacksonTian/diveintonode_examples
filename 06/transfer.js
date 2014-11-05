var http = require('http');
var helloworld = "";

for (var i = 0; i < 1024 * 10; i++) {
  helloworld += "a";
}

var str = helloworld;
var buf = new Buffer(helloworld);

http.createServer(function (req, res) {
  res.writeHead(200);
  if (req.url === '/str') {
    res.write(helloworld);
  } else {
    res.write(buf);
  }
  res.end();
}).listen(8000);
