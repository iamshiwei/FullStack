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
    const {HTTP_ROOT} = ctx.config;
    let {username, password} = ctx.request.fields;
    let admins = JSON.parse((await afs.readFile(path.resolve(__dirname, '../../admins.json'))).toString());

    function findAdmin(username) {
        let a = null;
        admins.forEach(admin => {
            if (admin.username == username) {
                a = admin;
            }
        });
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
router.all('*', async (ctx, next) => {
    let {HTTP_ROOT} = ctx.config;
    if (!ctx.session['admin']) {
        ctx.redirect(`${HTTP_ROOT}/admin/login`)
    } else {
        await next();
    }
});
router.get('/', async ctx => {
    const {HTTP_ROOT} = ctx.config;
    ctx.redirect(`${HTTP_ROOT}/admin/banner`);
});
const fields = [
    {title: "标题", name: 'title', type: 'text'},
    {title: "图片", name: 'src', type: 'file'},
    {title: "地址", name: 'href', type: 'text'},
    {title: "序号", name: 'serial', type: 'number'},
];
router.get('/banner', async ctx => {
    const table = 'banner_table';
    const {HTTP_ROOT} = ctx.config;
    let datas = await ctx.db.query(`SELECT * FROM ${table}`);
    await ctx.render('admin/table', {
        HTTP_ROOT,
        type: 'view',
        datas,
        action: `${HTTP_ROOT}/admin/banner`,
        fields
    })
});
router.post('/banner', async ctx => {
    let {HTTP_ROOT} = ctx.config;
    let {title, src, href, serial} = ctx.request.fields;
    src = path.basename(src[0].path);
    await ctx.db.query('INSERT INTO banner_table (title, src, href, serial) VALUES (?,?,?,?)', [title, src, href, serial]);
    ctx.redirect(`${HTTP_ROOT}/admin/banner`);
});
router.get('/banner/delete/:id/', async ctx => {
    let {id} = ctx.params;
    let {UPLOAD_DIR, HTTP_ROOT} = ctx.config;
    let data = await ctx.db.query(`SELECT * FROM banner_table WHERE ID=?`, [id]);
    ctx.assert(data.length, 400, 'not found');
    let row = data[0];
    await common.unlink(path.resolve(UPLOAD_DIR, row.src));
    await ctx.db.query('DELETE FROM banner_table WHERE ID=?', [id]);
    ctx.redirect(`${HTTP_ROOT}/admin/banner`);
});
// router.get('/banner/modify/:id/', async ctx => {
//     let {UPLOAD_DIR, HTTP_ROOT} = ctx.config;
//     let {id} = ctx.params;
//     let data = await ctx.db.query('SELECT * FROM banner_table WHERE ID=?', [id]);
//     ctx.assert(data.length, 400, 'not found');
//     let row = data[0];
//     await ctx.render('admin/table', {
//         HTTP_ROOT,
//         type: 'modify',
//         old_datas: row,
//         fields,
//         action: `${HTTP_ROOT}/banner/modify/${id}`
//     })
// });
router.get('/banner/get/:id/', async ctx=>{
    let {id} = ctx.params;
    let rows = await ctx.db.query('SELECT * FROM banner_table WHERE ID=?', [id]);
    if(rows.length == 0) {
        ctx.body={err: 1, msg: 'no this data'}
    } else {
        ctx.body={err: 0, data: rows[0]}
    }
})
router.post('/banner/modify/:id/', async ctx=>{

})
module.exports = router.routes();