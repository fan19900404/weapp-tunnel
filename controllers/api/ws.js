const Router = require("koa-router");
const router = new Router();

router.post("/ws/push", ctx => {
  // directive = {"type":"send","msg":{"a":456}}
  const { tunnelId, token, directive, signature } = ctx.request.body;
  // TODO 签名验证
  let dc;
  if (directive) {
    dc = JSON.parse(directive);
  }

  const { socket } = global.tunnels[tunnelId];

  const { type, msg } = dc;
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

  ctx.body = {
    code: 0,
    msg: "成功"
  };
});

module.exports = router;
