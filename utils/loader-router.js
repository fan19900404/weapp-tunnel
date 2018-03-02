const Router = require('koa-router');
const cfg = require('../config');
const walkdir = require('./walkdir');

const router = new Router({ strict: true });

// 加载的路由列表
const routes = [];

// 路由加载配置
const opt = {
  path: '../controllers', // 目录
  auto: true, // 自动加载路由 (忽略include但会排除exclude部分)
  include: [], // 需要加载的路由
  exclude: [], // 需要排除的路由
};

if (!cfg.debug) {
  opt.exclude.push('test'); // 上线后忽略 test 路由
}

/**
 * 加载 include 列表
 */
function loadList() {
  opt.include.forEach((it) => {
    if (opt.exclude.indexOf(it) < 0) {
      routes.push(require(`${opt.path}/${it}`)); // eslint-disable-line
    }
  });
}

/**
 * 加载全部 (排除exclude部分)
 */
function loadAll() {
  const files = walkdir(`${__dirname}/${opt.path}`, /\.js$/i);
  files.forEach((path) => {
    if (opt.exclude.indexOf(path) < 0) {
      routes.push(require(path)); // eslint-disable-line
    }
  });
}

// 是否自动加载
if (opt.auto) {
  loadAll();
} else {
  loadList();
}

// 合并路由
routes.forEach((route) => {
  router.use('', route.routes(), route.allowedMethods());
});

module.exports = router;
