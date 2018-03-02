const { check } = require("../utils/signature");

const ws = io => {
  io.use((socket, next) => {
    // token:业务服务器创建的token，用于标识小程序用户；tunnelId频道id，其实就是房间号；signature:签名,
    let { token, signature, tunnelId } = socket.handshake.query;
    if (check(`${token}${tunnelId}`, signature)) {
      return next();
    }
    socket.disconnect(true); //如果没有通过验证则终止
    return next(new Error("authentication error"));
  });

  const nsp = io.of("/weapp");
  nsp.on("connection", function(socket) {
    console.log(socket.connect);
  });
};

module.exports = ws;
