const process = require('process');
let mode = "dev";
module.exports = {
    mode,
    ...(mode == 'dev' ? require('./config.dev') : require('./config.prod')),

}