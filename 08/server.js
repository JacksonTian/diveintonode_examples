var http = require('http');
var url = require('url');

var parseCookie = function (cookie) {
  var cookies = {};
  if (!cookie) {
    return cookies;
  }

  var list = cookie.split(';');
  for (var i = 0; i < list.length; i++) {
    var pair = list[i].split('=');
    cookies[pair[0].trim()] = pair[1];
  }
  return cookies;
};
var checkUser = function () {
  return false;
};
http.createServer(function (req, res) {
  // console.log(req.method);
  // console.log(req.url);
  // console.log(url.parse(req.url, true).query);
  console.log(req.headers);
  // console.log(parseCookie(req.headers.cookie));
  // res.setHeader('Location', '/pathname?session_id=hehe');
  // res.writeHead(302);
  // res.end();
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
  // var auth = req.headers['authorization'] || '';
  // var parts = auth.split(' ');
  // var method = parts[0] || ''; // Basic
  // var encoded = parts[1] || ''; // dXNlcjpwYXNz
  // var decoded = new Buffer(encoded, 'base64').toString('utf-8').split(":");
  // var user = decoded[0]; // user
  // var pass = decoded[1]; // pass
  // if (!checkUser(user, pass)) {
  //   res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
  //   res.writeHead(401);
  //   res.end();
  // } else {
  //   res.writeHead(200, {'Content-Type': 'text/plain', 'Server': 'hehe'});
  //   res.end('Hello World\n');
  // }
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

// function (req, res) {
//   switch (req.method) {
//   case 'POST':
//     update(req, res);
//     break;
//   case 'DELETE':
//     remove(req, res);
//     break;
//   case 'PUT':
//     create(req, res);
//     break;
//   case 'GET':
//   default:
//     get(req, res);
//   }
// }

