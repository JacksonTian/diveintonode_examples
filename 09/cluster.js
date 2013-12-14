var cluster = require('cluster');

cluster.setupMaster({
  exec : "worker.js"
});

var cpus = require('os').cpus();
for (var i = 0; i < cpus.length; i++) {
  cluster.fork();
}

cluster.on('exit', function(worker, code, signal) {
  var exitCode = worker.process.exitCode;
  console.log('worker ' + worker.process.pid + ' died (' + exitCode + '). restarting...');
  cluster.fork();
});
