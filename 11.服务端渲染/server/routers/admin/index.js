const Router = require('koa-router');
let router = new Router();

router.get('/login', async ctx => {
  ctx.body = 'login'
})


module.exports = router.routes();