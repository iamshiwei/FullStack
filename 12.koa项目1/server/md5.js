const crypto = require('crypto');
let obj = crypto.createHash('md5');
obj.update('shiwei19910513');
console.log(obj.digest('hex'));