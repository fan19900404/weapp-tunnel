const Router = require('koa-router');
const walkdir = require('../utils/walkdir');

const router = new Router({ strict: true });

// 注册后台模块
walkdir(`${__dirname}/api`, /\.js$/i)
  .forEach((path) => {
    const route = require(path); // eslint-disable-line
    router.use('/api', route.routes(), route.allowedMethods());
  });

module.exports = router;