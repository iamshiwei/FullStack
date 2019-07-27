const path = require('path');
let str = '/root/a/b/1.png';
console.log(path.dirname(str));  // /root/a/b
console.log(path.extname(str));  // .png
console.log(path.basename(str));  // 1.png
console.log(path.resolve('root/a/b', '../', './', 'build')); // /Users/2587159769qq.com/Code/FullStack/1.ES6/5/root/a/build

console.log(path.resolve(__dirname, 'build'));