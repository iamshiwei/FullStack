const url = require('url');
let str = "http://baidu.com/a/b/1.html?user=shiwei&pass=4ee";
console.log(url.parse(str, true));