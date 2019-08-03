const express = require('express');
const bodyParser = require('body-parser');
let server = express();
server.listen(8888);

server.use(bodyParser.urlencoded({
    extended: false
}));
// 处理post接口
server.post('/reg',(req, res)=>{
    console.log(req.body);
})