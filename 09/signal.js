process.on('SIGTERM', function() {
  console.log('Got a SIGTERM, exiting...');
  process.exit(1);
});

console.log('server running with PID:', process.pid);
process.kill(process.pid, 'SIGTERM');
