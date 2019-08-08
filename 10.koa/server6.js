const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');
let server = new Koa();
server.listen(8888);
let router = new Router();
server.use(router.routes());
// 不同资源用不同的失效时间
let staticRouter = new Router();
staticRouter.all(/(\.jpg|\.png|\.gif)$/i, static('./static', {
    maxage: 60 * 86400 * 1000
}));
staticRouter.all(/(\.css)$/i, static('./static', {
    maxage: 7 * 86400 * 1000
}));
staticRouter.all(/(\.html)$/i, static('./static', {
    maxage: 20 * 86400 * 1000
}));
server.use(staticRouter.routes());