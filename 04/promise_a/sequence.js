var Deferred = function () {
  this.promise = new Promise();
};

Deferred.prototype.resolve = function (obj) {
  var promise = this.promise;
  var handler;
  while ((handler = promise.queue.shift())) {
    if (handler && handler.fulfilled) {
      var ret = handler.fulfilled(obj);
      if (ret && ret.isPromise) {
        ret.queue = promise.queue;
        this.promise = ret;
        return;
      }
    }
  }
};

Deferred.prototype.reject = function (err) {
  var promise = this.promise;
  var handler;
  while ((handler = promise.queue.shift())) {
    if (handler && handler.error) {
      var ret = handler.error(err);
      if (ret && ret.isPromise) {
        ret.queue = promise.queue;
        this.promise = ret;
        return;
      }
    }
  }
};

Deferred.prototype.callback = function () {
  var that = this;
  return function (err, file) {
    if (err) {
      return that.reject(err);
    }
    that.resolve(file);
  };
};


var Promise = function () {
  this.queue = [];
  this.isPromise = true;
};

Promise.prototype.then = function (fulfilledHandler, errorHandler, progressHandler) {
  var handler = {};
  if (typeof fulfilledHandler === 'function') {
    handler.fulfilled = fulfilledHandler;
  }
  if (typeof errorHandler === 'function') {
    // 利用once方法，保证异常回调只执行一次
    handler.error = errorHandler;
  }
  this.queue.push(handler);
  return this;
};

var fs = require('fs');

var readFile1 = function (file, encoding) {
  var deferred = new Deferred();
  fs.readFile(file, encoding, deferred.callback());
  return deferred.promise;
};
var readFile2 = function (file, encoding) {
  var deferred = new Deferred();
  fs.readFile(file, encoding, deferred.callback());
  return deferred.promise;
};

readFile1('file1.txt', 'utf8').then(function (file1) {
  return readFile2(file1.trim(), 'utf8');
}).then(function (file2) {
  // file2 => 2
  console.log(file2);
});

exports.Deferred = Deferred;
