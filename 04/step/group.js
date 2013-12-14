var fs = require('fs');
var Step = require('step');

Step(
  function readDir() {
    fs.readdir(__dirname, this);
  },
  function readFiles(err, results) {
    if (err) throw err;
    // Create a new group
    var group = this.group();
    results.forEach(function (filename) {
      if (/\.txt$/.test(filename)) {
        fs.readFile(__dirname + "/" + filename, 'utf8', group());
      }
    });
  },
  function showAll(err, files) {
    if (err) throw err;
    console.dir(files);
  }
);
