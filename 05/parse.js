Parser.prototype.parse = function (s) {
  var l = '';
  for (var i = 0; i < s.length; i++) {
    if (s[i] == '\u0000') {
      l = Number(l);
      this.emit('data', s.substr(i + 1, l));
      return this.parse(s.substr(i + 1 + l));
    } else {
      l += s[i];
    }
  }
  return s;
};

Parser.prototype.parse = function (s) {
  var l = '';
  for (var i = 0; i < s.length; i++) {
    if (s[i] == '\u0000') {
      l = Number(l);
      this.emit('data', s.substr(i + 1, l));
      s = s.substr(i + 1 + l);
      i = 0;
      l = '';
    } else {
      l += s[i];
    }
  }
  return s;
};

Parser.prototype.parse = function (s) {
  var l = '';
  var j = 0;
  for (var i = 0; i < s.length; i++) {
    if (s[i] == '\u0000') {
      l = Number(l);
      this.emit('data', s.substr(i + 1, l));
      i += l;
      j = i + 1;
    } else {
      l += s[i];
    }
  }
};

Parser.prototype.parse4 = function (s) {
  var l = 0, i = 0;
  while (i < s.length) {
    var ch = s.charCodeAt(i);
    if (ch === 0) {
      this.emit('data', s.substr(i + 1, l));
      i += l + 1;
      l = 0;
    } else {
      l = l * 10 + ch;
      i++;
    }
  } 
};
