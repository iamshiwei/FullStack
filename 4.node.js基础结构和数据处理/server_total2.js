const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');
let users = {

}
http.createServer((req, res) => {
    let path = {}, get = {}, post = {};
    if (req.method == 'GET') {
        let { pathname, query } = url.parse(req.url, true);
        path = pathname;
        get = query;
        complete();
    } else if (req.method == 'POST') {
        path = req.url;
        let arr = [];
        req.on('data', (buffer) => {
            arr.push(buffer);
        })
        req.on('end', () => {
            var buffer = Buffer.concat(arr);
            post = querystring.parse(buffer.toString());
            complete();
        })
    }
    function complete() {
        if (path == '/reg') {
            let { username, pass } = get;
            if (users[username]) {
                res.write(JSON.stringify({ error: 1, msg: "user has in" }));
                res.end();
            } else {
                users[username] = pass;
                res.write(JSON.stringify({ error: 0, msg: "reg su" }));
                res.end();
            }
        } else if (path == '/login') {
            let { username, pass } = get;
            if (!users[username]) {
                res.write(JSON.stringify({ error: 1, msg: "no this user" }));
                res.end();
            } else if (users[username] != pass) {
                res.write(JSON.stringify({ error: 1, msg: "pass err" }));
                res.end();
            } else {
                res.write(JSON.stringify({ error: 0, msg: "succ" }));
                res.end();
            }
        } else {
            console.log(path);
            fs.readFile(`www${path}`, (err, buffer) => {
                if (err) {
                    res.writeHead(404);
                    res.write('not found');
                    res.end();
                } else {
                    res.write(buffer);
                    res.end();
                }
            })
        }
    }
}).listen(8888);