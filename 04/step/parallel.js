var fs = require('fs');
var Step = require('step');

Step(
  function readFile1() {
    fs.readFile('file1.txt', 'utf-8', this.parallel());
    fs.readFile('file2.txt', 'utf-8', this.parallel());
  },
  function done(err, content1, content2) {
    // content1 => file1
    // content2 => file2
    console.log(arguments);
  }
);
