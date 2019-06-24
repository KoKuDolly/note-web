const net = require('net')
const server = net.createServer()
server.on('connection',(socket)=>{
  socket.on('data',(data)=>{
    socket.write('nihao')
  })
  socket.on('end',()=>{
    console.log('cut')
  })
  socket.write('welcome')
})
server.listen(8124,()=>{
  console.log('server bound')
})