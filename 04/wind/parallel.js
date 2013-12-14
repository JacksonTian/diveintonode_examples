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

var parallel = eval(Wind.compile("async", function () {
  var result = $await(Task.whenAll({
    file1: readFileAsync('file1.txt', 'utf-8'),
    file2: readFileAsync('file2.txt', 'utf-8')
  }));
  console.log(result.file1);
  console.log(result.file2);
}));

parallel().start();
