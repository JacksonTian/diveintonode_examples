var memwatch = require('memwatch');
var leakArray = [];
var leak = function () {
  leakArray.push("leak" + Math.random());
};

// Take first snapshot
var hd = new memwatch.HeapDiff();

for (var i = 0; i < 10000; i++) {
  leak();
}

// Take the second snapshot and compute the diff
var diff = hd.end();
console.log(JSON.stringify(diff, null, 2));
