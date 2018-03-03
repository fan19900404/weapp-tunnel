const Router = require("koa-router");
const md5 = require("../../utils/md5");
const { check,compute } = require("../../utils/signature");
const config = require("../../config/index");
const router = new Router();

// 计算出信道Id
const computeTunnelId = token => {
  const now = +new Date();
  let id = md5(`${now}${token}`);
  if (!global.tunnels[id]) {
    // 防止重复
    return id;
  }
  return computeTunnelId(id);
};

// 业务服务器需要提供，token，url，signature
router.post("/get/wsurl", ctx => {
  
  const { token, url, signature } = ctx.request.body;
  if (!token || !url || !signature) {
    ctx.body = {
      code: -1,
      msg: "参数不正确"
    };
    return false;
  }

  if (!check(`${token}${url}`, signature)) {
    ctx.body = { code: -1, msg: "签名错误" };
    return false;
  }

  const tunnelId = computeTunnelId(token);

  global.tunnels[tunnelId] = {
    tunnelId,
    url,
    token,
    createTime: +new Date()
  };

  console.log(global.tunnels);
  console.log(compute(`${token}${tunnelId}`));

  ctx.body = {
    code: 0,
    data: {
      tunnelId,
      url: config.host +':'+ config.port + "/weapp"
    }
  };
});

module.exports = router;
