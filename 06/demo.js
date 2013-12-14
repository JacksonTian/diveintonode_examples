var str = "深入浅出node.js";
var buf = new Buffer(str, 'utf-8');
console.log(buf);
// <Buffer f1 65 45 fa 6e 6f 64 65 2e 6a 73>

var buf = new Buffer(100);
console.log(buf.length); // 100
console.log(buf[10]); // 0-255
console.log(buf[11]); // 0-255

buf[10] = 100;
console.log(buf[10]);

buf[20] = -300;
console.log(buf[20]); // 212
buf[21] = 300;
console.log(buf[21]); // 44
buf[22] = 3.1415;
console.log(buf[22]); // 3
buf[23] = 256;
console.log(buf[23]); // 0
buf[24] = 300.1415;
console.log(buf[24]); // 44
