const ws = (io)=>{
  io.on('connection',function(socket){
    console.log(socket.id);
  })
}

module.exports = ws;