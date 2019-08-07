const Koa = require('koa');
const Router = require('koa-router');
let server = new Koa();
server.listen(8888);

// 路由
let router = new Router();
router.get('/a', async ctx => {
    console.log(ctx.query);
    ctx.body=ctx;

})
server.use(router.routes());