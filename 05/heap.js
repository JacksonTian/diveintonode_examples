var size = 10 * 1024 * 1024; // 100M
var arr = new Array(size);
for (var i = 0; i < size; i++) {
  arr[i] = 0;
}
var mem = process.memoryUsage();
console.log(mem);
