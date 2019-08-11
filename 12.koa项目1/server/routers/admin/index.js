const Router = require('koa-router');
const path = require('path');
const afs = require('await-fs');
const common = require('../../libs/common');
let router = new Router();

// 返回登录页面
router.get('/login', async ctx => {
    await ctx.render('admin/login', {
        HTTP_ROOT: ctx.config.HTTP_ROOT,
        errMsg: ctx.query.errMsg
    })
});
router.post('/login', async ctx => {
    const { HTTP_ROOT } = ctx.config;
    let { username, password } = ctx.request.fields;
    let admins = JSON.parse((await afs.readFile(path.resolve(__dirname, '../../admins.json'))).toString());

    function findAdmin(username) {
        let a = null;
        admins.forEach(admin => {
            if (admin.username == username) {
                a = admin;
            }
        })
        return a;
    }
    let admin = findAdmin(username);

    if (!admin) {
        ctx.redirect(`${HTTP_ROOT}/admin/login?errMsg=${encodeURIComponent('用户不存在')}`);
    } else if (admin.password != common.md5(password)) {
        ctx.redirect(`${HTTP_ROOT}/admin/login?errMsg=${encodeURIComponent('密码不正确')}`);
    } else {
        // success
        ctx.session['admin'] = username;
        ctx.redirect(`${HTTP_ROOT}/admin`)
    }
});
// 鉴别管理元权限的代码必须放在登录路由的下面，否则登录也会被拦截
router.all('*', async (ctx, next)=>{
    let {HTTP_ROOT} = ctx.config;
    if(!ctx.session['admin']){
        ctx.redirect(`${HTTP_ROOT}/admin/login`)
    } else {
        await next();
    }
})
router.get('/banner', async ctx=>{
    ctx.body = 'banner';
    
} )

module.exports = router.routes();