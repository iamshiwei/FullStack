const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.listen(8888);

app.use(cookieParser('fnsfnsfnskfmamdsndallaladnl'));

app.get('/a', (req, res) => {

    console.log(req.cookies);
    console.log(req.signedCookies);
    res.cookie('amount', 999, {
        // httpOnly: true,
        // secure: true,   // 只有https才可以使用
        signed: true,
        maxAge: 14 * 86400 * 1000
    })
    res.send('ok');
})