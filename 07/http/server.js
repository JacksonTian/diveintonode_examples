var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.writeHead(200);
  res.end('Hello World\n');
  res.writeHead(200);
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
