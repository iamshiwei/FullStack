const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const url = require('url');
const multiparty = require('multiparty');
const {Form} = require('zlib');
const zlib = require('zlib');
const router = require('../libs/router');
const {HTTP_PORT, HTTP_ROOT, HTTP_UPLOAD} = require('../config');
http.createServer((req, res) => {
    res.writeJson = function(json){
        res.setHeader('content-type', 'application/json');
        res.write(JSON.stringify(json));
    }
    let {pathname, query} = url.parse(req.url, true);
    // 1.解析数据
    if (req.method == 'POST') {
        if (req.headers['content-type'].startsWith('application/x-www-form-urlencoded')) {
            // 普通post
            let arr = [];
            req.on('data', buffer => {
                arr.push(buffer);
            })
            req.on('end', () => {
                let post = querystring(Buffer.concat(arr).toString());
                // 找路由
                handle(req.method, req.url, post, {})
            })
        } else {
            // 文件
            let form = new Form({
                uploadDir: HTTP_UPLOAD
            })
            form.parse(req);
            let post = {};
            let files = {};
            form.on('field', (name, value) => {
                post[name] = value;
            })
            form.on('file', (name, file) => {
                files[name] = file;
            })
            form.on('error', err => {
                console.log(err);
            })
            form.on('close', () => {
                // 找路由
                handle(req.method, pathname, query, post, files);
            })
        }
    } else {
        // 找路由
        handle(req.method, pathname, query,{}, {})
    }

    async function handle(method, url, get, post, files) {
        let fn = router.findRouter(method, url);
        if(!fn) {
            // 文件
            let filepath = HTTP_ROOT+pathname;
            fs.stat(filepath, (err, stat)=>{
                if(err){
                    res.writeHead(404);
                    res.write('not found');
                    res.end();
                } else {
                    let rs = fs.createReadStream(filepath);
                    let gz = zlib.createGzip();
                    rs.on('error', (err)=>{console.log(err)})
                    res.setHeader('content-encoding', 'gzip');
                    rs.pipe(gz).pipe(res);
                }
            })
        } else {
            // 接口
            try{
                await fn(res, get,post, files)
            }catch(err){
                res.writeHead(500);
                res.write('Internal Server Error');
                res.end ();
            }
        }
    }
}).listen(HTTP_PORT);
console.log(`server started at ${HTTP_PORT}`);