const http = require('http');
const querystring = require('querystring');
http.createServer((req, res)=>{
    let arr = [];
    req.on('data', (buffer)=>{
        arr.push(buffer);
    })
    req.on('end', ()=>{
        var buffer = Buffer.concat(arr);
        console.log(buffer.toString());
        let post = querystring.parse(buffer.toString())
        console.log(post);
    })
}).listen(8888)