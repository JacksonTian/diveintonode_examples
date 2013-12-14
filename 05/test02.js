var a = {};

for (var i = 0; i < 100000; i++) {
  a['i' + i] = {};
}

for (var j = 0; j < 1000000; j++) {
  var b = {};
}
