let Router = require('koa-router');
let router = new Router();
router.get('/a', async ctx=>{
    ctx.body = 'company的a';
})
module.exports = router.routes();