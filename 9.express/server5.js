const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.listen(8888);

app.use(cookieParser());

app.get('/a', (req, res)=>{
    console.log(req.cookies);
    res.cookie('amount', 99.8, {
        maxAge: 86400*1000, // 1天  有效期
        // domain: 'aaa.com'
        // path: '/'

    });
    res.send('ok');
})