const express = require('express');
let server = express();
server.listen(8888);
// 处理接口
server.get('/a', (req, res, next)=>{
    console.log(req.query);
})