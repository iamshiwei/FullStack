const Koa = require('koa');
const Router = require('koa-router');
let server = new Koa();
server.listen(8888);

// 路由
let router = new Router();
router.get('/news/:id', async ctx => {
    let {id} = ctx.params;
})
router.get('/news/:id/:id2/:id3', async ctx => {
    let {id, id2, id3} = ctx.params;
    console.log(id, id2, id3);
})
server.use(router.routes());