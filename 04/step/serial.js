var fs = require('fs');
var Step = require('step');

Step(
  function readFile1() {
    fs.readFile('file1.txt', 'utf-8', this);
  },
  function readFile2(err, content) {
    fs.readFile('file2.txt', 'utf-8', this);
  },
  function done(err, content) {
    console.log(content);
  }
);
