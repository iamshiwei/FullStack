const express = require('express');
let server = express();
server.listen(8888);
// 处理接口
server.get('/a', (req, res, next)=>{
    res.send({err: 1, msg: 'aaa'})
})
server.get('/b', (req, res, next)=>{
    res.send({err: 1, msg: 'bbb'})
})
// 处理文件
server.use(express.static('./static/'))