var fs = require('fs');

var Deferred = require('./sequence.js').Deferred;

var smooth = function (method) {
  return function () {
    var deferred = new Deferred();
    var args = Array.prototype.slice.call(arguments, 1);
    args.push(deferred.callback());
    method.apply(null, args);
    return deferred.promise;
  };
};

var readFile = smooth(fs.readFile);
readFile('file1.txt', 'utf8').then(function (file1) {
  return readFile(file1.trim(), 'utf8');
}).then(function (file2) {
  // file2 => I am file2
  console.log(file2);
});
