var Benchmark = require('benchmark');

var suite = new Benchmark.Suite();

var mymap1 = function (arr, callback) {
  var ret = [];
  for (var i = 0, l = arr.length; i < l; i++) {
    ret.push(callback(arr[i]));
  }
  return ret;
};
var mymap2 = function (arr, callback) {
  var ret = [];
  for (var i = 0, l = arr.length; i < l; i++) {
    ret.push(callback(arr[i], i));
  }
  return ret;
};
var mymap3 = function (arr, callback) {
  var ret = [];
  for (var i = 0, l = arr.length; i < l; i++) {
    ret.push(callback(arr[i], i, arr));
  }
  return ret;
};
var mymap4 = function (arr, callback) {
  var ret = [];
  for (var i = 0, l = arr.length; i < l; i++) {
    ret.push(callback.call(arr, arr[i], i, arr));
  }
  return ret;
};
var mymap5 = function (arr, callback) {
  var ret = [];
  for (var i = 0, l = arr.length; i < l; i++) {
    ret.push(callback.apply(arr, [arr[i], i, arr]));
  }
  return ret;
};
var mymap6 = function (arr, callback) {
  var ret = [];
  for (var i = 0, l = arr.length; i < l; i++) {
    ret.push(callback.apply(arr, [arr[i], i]));
  }
  return ret;
};
var mymap7 = function (arr, callback) {
  var ret = [];
  for (var i = 0, l = arr.length; i < l; i++) {
    ret.push(callback.apply(arr, [arr[i]]));
  }
  return ret;
};

// add tests
var list = [];
for (var i = 0; i < 10000; i++) {
  list[i] = i;
}

suite.add('map', function () {
  list.map(function (item) {
    return item * 2;
  });
})
.add('mymap1', function () {
  mymap1(list, function (item) {
    return item * 2;
  });
})
.add('mymap2', function () {
  mymap2(list, function (item) {
    return item * 2;
  });
})
.add('mymap3', function () {
  mymap3(list, function (item) {
    return item * 2;
  });
})
.add('mymap4', function () {
  mymap4(list, function (item) {
    return item * 2;
  });
})
.add('mymap5', function () {
  mymap5(list, function (item) {
    return item * 2;
  });
})
.add('mymap6', function () {
  mymap6(list, function (item) {
    return item * 2;
  });
})
.add('mymap7', function () {
  mymap6(list, function (item) {
    return item * 2;
  });
})
.add('for push', function () {
  var ret = [];
  for (var i = 0, l = list.length; i < l; i++) {
    ret.push(list[i] * 2);
  }
})
.add('for index', function () {
  var ret = [];
  for (var i = 0, l = list.length; i < l; i++) {
    ret[i] = list[i] * 2;
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
