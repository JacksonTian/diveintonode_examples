var foo = function () {
  (function () {
    var local = "局部变量";
  }());
  console.log(local);
};
foo();
