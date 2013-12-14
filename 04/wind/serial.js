var fs = require('fs');

var Wind = require("wind");
var Task = Wind.Async.Task;

var readFileAsync = function (file, encoding) {
  return Task.create(function (t) {
    fs.readFile(file, encoding, function (err, file) {
      if (err) {
        t.complete("failure", err);
      } else {
        t.complete("success", file);
      }
    });
  });
};
// var readFileAsync = Wind.Async.Binding.fromStandard(fs.readFile);

var serial = eval(Wind.compile("async", function () {
  var file1 = $await(readFileAsync('file1.txt', 'utf-8'));
  console.log(file1);
  var file2 = $await(readFileAsync('file2.txt', 'utf-8'));
  console.log(file2);
  try {
    var file3 = $await(readFileAsync('file3.txt', 'utf-8'));
  } catch (err) {
    console.log(err);
  }
}));

serial().start();
