var async = require('async');

async.waterfall([
    function(callback){
        console.log(arguments);
        setTimeout(function () {
            callback(null, 'one', 'two');
        }, 20);
    },
    function(arg1, arg2, callback){
        console.log(arguments);
        setTimeout(function () {
            callback(null, 'three');
        }, 10);
    },
    function(arg1, callback){
        console.log(arguments);
        // arg1 now equals 'three'
        callback(null, 'done');
    }
], function (err, result) {
   // result now equals 'done'    
   console.log(arguments);
});
