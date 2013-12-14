var foo = function () {
  var local = "局部变量";
  (function () {
    console.log(local);
  }());
};
foo();
