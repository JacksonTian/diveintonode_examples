var Benchmark = require('benchmark');

var suite = new Benchmark.Suite();
// add tests
var list = [];
for (var i = 0; i < 10000; i++) {
  list[i] = i;
}

suite.add('origin', function () {
  var sum = 0;
  for (var i = 0; i < list.length; i++) {
    sum += list[i];
  }
})
.add('refined', function () {
  var sum = 0;
  for (var i = 0, l = list.length; i < l; i++) {
    sum += list[i];
  }
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
// run async
.run();
