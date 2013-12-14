var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var querystring = require('querystring');

var mime = require('mime');

var framework = function (req, res) {
  var index = -1;
  var next = function () {
    index++;
    var middleware = framework.stack[index];
    middleware.handle(req, res, next);
  };
  next();
};

framework.stack = [];

framework.use = function (route, handle) {
  if (typeof route === 'function') {
    handle = route;
    route = '/';
  }
  framework.stack.push({route: route, handle: handle});
};

var server = function () {
  return framework;
};

server.staticFile = function (root) {
  return function (req, res, next) {
    var pathname = url.parse(req.url).pathname;
    fs.readFile(path.join(root, pathname), function (err, file) {
      if (err) {
        if (err.code === 'ENOENT') {
          return next();
        } else {
          return next(err);
        }
      }
      res.writeHead(200, {'Content-Type': mime.lookup(pathname)});
      res.end(file);
    });
  };
};

server.render = function (viewpath) {
  var cache = {};

  var complie = function (str) {
    var tpl = str.replace(/\n/g, '\\n')
    .replace(/<%=([\s\S]+?)%>/g, function (match, code) {
      // 转义
      return "' + escape(" + code + ") + '";
    }).replace(/<%=([\s\S]+?)%>/g, function (match, code) {
      // 正常输出
      return "' + " + code + "+ '";
    }).replace(/<%([\s\S]+?)%>/g, function (match, code) {
      // 可执行代码
      return "';\n" + code + "\ntpl += '";
    }).replace(/\'\n/g, '\'')
    .replace(/\n\'/gm, '\'');

    tpl = "tpl = '" + tpl + "';";
    // 转换空行
    tpl = tpl.replace(/''/g, '\'\\n\'');
    tpl = 'var tpl = "";\nwith (obj || {}) {\n' + tpl + '\n}\nreturn tpl;';
    console.log(tpl);
    return new Function('obj', 'escape', tpl);
  };

  http.ServerResponse.prototype.render = function (viewname, data) {
    var res = this;
    if (!cache[viewname]) {
      var text;
      try {
        text = fs.readFileSync(path.join(viewpath, viewname), 'utf8');
      } catch (ex) {
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.end('模版文件错误');
        return;
      }
      cache[viewname] = complie(text);
    }
    var complied = cache[viewname];
    res.writeHead(200, {'Content-Type': 'text/html'});
    var html = complied(data);
    res.end(html);
  };
  return function (req, res, next) {
    next();
  };
};

var app = server();
app.use(server.staticFile(path.join(__dirname, 'assets')));
app.use(server.render(path.join(__dirname, 'views')));
app.use(function (req, res, next) {
  res.render('index.html');
});

http.createServer(app).listen(3001, function () {
  console.log('start at 3001');
});
