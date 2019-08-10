const Koa = require('koa');
const Router = require('koa-router');
const staticBase = require('./routers/static');
const body = require('koa-better-body');
const path = require('path');
const session = require('koa-session');
const fs = require('fs');
const ejs = require('koa-ejs');

let app = new Koa();
app.listen(8888);

// 中间件
app.use(body({
    uploadDir: path.resolve(__dirname, './static/upload')
}));
ejs(app, {
    root: path.resolve(__dirname, 'template'),
    layout: false,
    viewExt: 'ejs',
    cache: false,
    debug: false
});
// session
app.keys = fs.readFileSync('.keys').toString().split('\n');
app.use(session({
    maxAge: 20 * 60 * 1000,
    renew: true,
}, app));
// 数据库
app.context.db = require('./libs/database');
// 使用路由和static
let router = new Router();
// 统一处理
router.use(async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        ctx.throw(500, 'Internal Server Error!')
    }
});
router.use('/admin', require('./routers/admin'));
router.use('/api', require('./routers/api'));
router.use('/', require('./routers/www'));
staticBase(router);
app.use(router.routes());