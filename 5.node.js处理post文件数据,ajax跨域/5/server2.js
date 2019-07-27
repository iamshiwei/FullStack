var http = require("http");
var multiparty = require("multiparty");
http.createServer((req, res)=>{
    let form = new multiparty.Form({
        uploadDir: './upload'
    });
    form.parse(req);
    form.on('field', (name, value)=>{
        console.log('字段' + name, value);
    });
    form.on('file', (name, file)=>{
        console.log('文件' + name, file);
    });
    form.on('close', ()=>{
        console.log('表单解析结束');
    })
}).listen(8888)