var fs = require('fs');
var path = require('path');

var escape = function (html) {
  return String(html)
    .replace(/&(?!\w+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

var complie = function (str) {
  var tpl = str.replace(/<%=([\s\S]+?)%>/g, function (match, code) {
    // 转义
    return "' + escape(" + code + ") + '";
  }).replace(/<%-([\s\S]+?)%>/g, function (match, code) {
    // 正常输出
    return "' + " + code + "+ '";
  }).replace(/<%([\s\S]+?)%>/g, function (match, code) {
    return "';\n" + code + "\ntpl += '";
  }).replace(/\'\n/g, '\'')
  .replace(/\n\'/gm, '\'');

  tpl = "tpl = '" + tpl + "';";
  tpl = tpl.replace(/''/g, '\'\\n\'');
  tpl = 'var tpl = "";\nwith (obj || {}) {\n' + tpl + '\n}\nreturn tpl;';
  return new Function('obj', 'escape', tpl);
};

var render = function (tpl, data) {
  return tpl.call(this, data, escape);
};

var tpl = 'Hello <%=username%>.';

console.log(render(complie(tpl), {username: '<script>alert("I am XSS.")</script>'}));

var tpl2 = [
  '<% if (obj.user) { %>',
    '<h2><%=user.name%></h2>',
  '<% } else { %>',
    '<h2>匿名用户</h2>',
  '<% } %>'].join('\n');

console.log(render(complie(tpl2), {user: {name: 'Jackson Tian'}}));

console.log(render(complie(tpl2), {}));

var tpl3 = [
  '<% for (var i = 0; i < items.length; i++) { %>',
    '<%var item = items[i];%>',
    '<p><%= i+1 %>、<%=item.name%></p>',
  '<% } %>'
].join('\n');
// console.log(render(complie(tpl3), {items: []}));
console.log(render(complie(tpl3), {items: [{name: 'Jackson'}, {name: '朴灵'}]}));

var preComplie = function (str) {
  return str.replace(/<%\s+(include.*)\s+%>/g, function (match, code) {
    var partial = code.split(/\s/)[1];
    return fs.readFileSync(path.join('/path/to/views', partial), 'utf8');
  });
};

var view = ['<ul>',
  '<% users.forEach(function(user){ %>',
    '<% include user %>',
  '<% }) %>',
'</ul>'].join('\n');

var partial = '<li><%=user.name%></li>';

console.log(preComplie(view));
