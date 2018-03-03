const axios = require("axios");
const { check } = require("../utils/signature");

const ws = io => {
  const nsp = io.of("/weapp");
  nsp.on("connection", function(socket) {
    let { token, signature, tunnelId } = socket.handshake.query;
    const tunnel = global.tunnels[tunnelId];
    tunnel.socket = socket;
    socket.on("msg", function(data) {
      console.log(data);
      axios.post(tunnel.url, { token, data }).then(res => res);
    });
  });

  // 凡是不符合的全部关掉
  io.on("connection", function(socket) {
    let { token, signature, tunnelId } = socket.handshake.query;
    if (!check(`${token}${tunnelId}`, signature) || !global.tunnels[tunnelId]) {
      socket.disconnect(true);
    }
  });
};

module.exports = ws;
