const http = require('http');
let server = http.createServer((req, res)=>{
    res.write("hello");
    res.end();
}).listen(8888)