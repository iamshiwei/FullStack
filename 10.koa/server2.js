const koa = require('koa');
const Router = require('koa-router');
let server = new koa();
server.listen(8888);

let router = new Router();
router.use('/user', require('./routes/user'))

server.use(router.routes())