const koa = require('koa');
const Router = require('koa-router');
let server = new koa();
server.listen(8888);

let router = new Router();
router.get('/a', (ctx, next)=>{
    ctx.body = 'qqq';
})
server.use(router.routes())