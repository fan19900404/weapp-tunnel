const Koa = require('koa');
const bodyParser = require('koa-bodyparser')
const router = require('./utils/loader-router'); // 路由加载器


const app = new Koa();
app.use(bodyParser());

// 加载路由
app.use(router.routes()).use(router.allowedMethods());

// 404
app.use((ctx) => {
  ctx.status = 404;
  ctx.body = '<script src="https://cdn.bootcss.com/socket.io/2.0.4/socket.io.slim.js"></script>';
});

module.exports = app;