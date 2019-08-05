const express = require('express');
const cookieSession = require('cookie-session');
const app = express();
app.listen(8888);
app.use(cookieSession({
    keys: ['dadadafss', 'czczcfwefcsf', 'rwrwrffwsczz'],
    maxAge: 20 * 60 * 1000
}));

app.get('/a', (req, res) => {
    // console.log(req.session);
    if (!req.session['view']) {
        req.session['view'] = 1;
    } else {
        req.session['view']++;
    }
    res.send(`欢迎你弟${req.session['view']}次到访`);
})