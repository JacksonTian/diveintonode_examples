var http = require('http');
http.createServer(function (req, res) {
  // res.writeHead(200, {'Content-Type': 'text/plain'});
  // res.end('<html><body>Hello World</body></html>\n');
  // 或者
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<html><body>Hello World</body></html>\n');
}).listen(1337);
console.log('Server running at http://127.0.0.1:1337/');
