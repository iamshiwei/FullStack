const Koa = require('koa');
const Router = require('koa-router');
const static = require('./routers/static');
const body = require('koa-better-body');
const path = require('path');
const session = require('koa-session');
const fs = require('fs');

let app = new Koa();
app.listen(8888);

// 中间件
app.use(body({
  uploadDir: path.resolve(__dirname, './static/upload')
}));
app.keys = fs.readFileSync().toString().split('\n');

// 使用路由和static
let router = new Router();
router.use('/admin', require('./routers/admin'));
router.use('/api', require('./routers/api'));
router.use('/', require('./routers/www'));
static(router)
app.use(router.routes());