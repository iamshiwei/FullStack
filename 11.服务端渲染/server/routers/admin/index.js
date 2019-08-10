const Router = require('koa-router');
const path = require('path');
const fs = require('await-fs');
let router = new Router();

// 返回登录页面
router.get('/login', async ctx => {
    await ctx.render('admin/login')
});
router.post('/login', async ctx => {
    let { user, pass } = ctx.request.fields;
    let admins = JSON.parse((await fs.readFile(path.resolve(__dirname, '../../admins.json'))).toString())
    ctx.body = admins;
});


module.exports = router.routes();