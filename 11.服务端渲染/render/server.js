const Koa = require('koa');
const ejs = require('koa-ejs');
const path = require('path');
const app = new Koa();
app.listen(8888);
// 使用ejs
ejs(app, {
  root: path.resolve(__dirname, 'template'),
  layout: false,
  viewExt: 'ejs',
  cache: false,
});
app.use( async ctx=>{
  await ctx.render('2', {
    arr: [12,34,22]
  })
})