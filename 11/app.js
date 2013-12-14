var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello world!');
}).listen(8000);


var fs = require('fs');
var path = require('path');

var pidfile = path.join(__dirname, 'run/app.pid');
fs.writeFileSync(pidfile, process.pid);

process.on('SIGTERM', function () {
  if (fs.existsSync(pidfile)) {
    fs.unlinkSync(pidfile);
  }
  process.exit(0);
});
