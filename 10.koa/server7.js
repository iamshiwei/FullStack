const Koa = require('koa');
const Router = require('koa-router');
const Body = require('koa-better-body');

let app = new Koa();
app.listen(8888);
app.use(Body({
    uploadDir: './static/upload'
}));
app.use(async ctx=>{
    // 文件和post数据都在fields上
    console.log(ctx.request.fields);
    ctx.body='aas';
})
