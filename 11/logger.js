var fs = require('fs');
var path = require('path');
var moment = require('moment');
var util = require('util');
var os = require('os');

var logdir = path.join(__dirname + '/logs');
if (!fs.existsSync(logdir)) {
  fs.mkdirSync(logdir);
}

var info = fs.createWriteStream(logdir + '/info.log', {flags: 'a', mode: '0666'});
var error = fs.createWriteStream(logdir + '/error.log', {flags: 'a', mode: '0666'});

var logger = new console.Console(info, error);

var format = function (msg) {
  var ret = '';
  if (!msg) {
    return ret;
  }

  var date = moment();
  var time = date.format('YYYY-MM-DD HH:mm:ss.SSS');
  if (msg instanceof Error) {
    var err = {
      name: msg.name,
      data: msg.data
    };

    err.stack = msg.stack;
    ret = util.format('%s %s: %s\nHost: %s\nData: %j\n%s\n\n',
      time,
      err.name,
      err.stack,
      os.hostname(),
      err.data,
      time
    );
    console.log(ret);
  } else {
    ret = time + ' ' + util.format.apply(util, arguments) + '\n';
  }
  return ret;
};

logger.log('Hello world!');
logger.error('segment fault');
logger.error(format(new Error()));

var input = '{error: format}';
try {
  JSON.parse(input);
} catch (ex) {
  ex.data = input;
  logger.error(format(ex));
}
