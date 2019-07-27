const http = require('http');
const fs = require('fs');
let server = http.createServer((req, res)=>{
    fs.readFile(`www${req.url}`, (err, data)=>{
        if(err){
            res.writeHead(404);
            res.write("not found");
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    })
}).listen(9999)