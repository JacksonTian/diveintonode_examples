var fs = require('fs');
var async = require('async');

async.parallel([
  function (callback) {
    fs.readFile('file1.txt', 'utf-8', callback);
  },
  function (callback) {
    fs.readFile('file2.txt', 'utf-8', callback);
  }
], function (err, results) {
  console.log(results);
  // results => [file1.txt, file2.txt]
});
