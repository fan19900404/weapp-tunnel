const Router = require("koa-router");
const router = new Router();

// 处理信息
const handle = (socket, type, msg) => {
  switch (type) {
    case "send":
      socket.emit("msg", msg);
      break;
    case "close":
      socket.disconnect(true);
      delete global.tunnels[tunnelId];
      break;
    default:
      console.log("指令错误");
  }
};

router.post("/ws/push", ctx => {
  // directive = {"type":"send","msg":{"a":456}}
  const { tunnelIds, directive, signature } = ctx.request.body;
  // TODO 签名验证
  let dc;
  if (directive) {
    dc = JSON.parse(directive);
  }

  const { type, msg } = dc;
  
  tunnelIds.forEach(tunnelId => {
    const { socket } = global.tunnels[tunnelId];
    if (socket) {
      handle(socket, type, msg);
    }
  });

  ctx.body = {
    code: 0,
    msg: "成功"
  };
});

module.exports = router;
