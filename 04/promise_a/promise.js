var EventEmitter = require('events').EventEmitter;

var Deferred = function () {
  this.state = 'unfulfilled';
  this.promise = new Promise();
};

Deferred.prototype.resolve = function (obj) {
  this.state = 'fulfilled';
  this.promise.emit('success', obj);
};

Deferred.prototype.reject = function (err) {
  this.state = 'failed';
  this.promise.emit('error', err);
};

Deferred.prototype.progress = function (data) {
  this.promise.emit('progress', data);
};

Deferred.prototype.all = function (promises) {
  var count = promises.length;
  var that = this;
  promises.forEach(function (promise) {
    promise.then(function () {
      count--;
      if (count === 0) {
        that.resolve();
      }
    }, function () {
      that.reject();
    });
  });
  return this.promise;
};

var Promise = function () {
  EventEmitter.call(this);
};
util.inherits(Promise, EventEmitter);

Promise.prototype.then = function (fulfilledHandler, errorHandler, progressHandler) {
  if (typeof fulfilledHandler === 'function') {
    // 利用once方法，保证成功回调只执行一次
    this.once('success', fulfilledHandler);
  }
  if (typeof errorHandler === 'function') {
    // 利用once方法，保证异常回调只执行一次
    this.once('error', errorHandler);
  }
  if (typeof progressHandler === 'function') {
    this.on('progress', progressHandler);
  }
  return this;
};

exports.Deferred = Deferred;
