const crypto = require('crypto')
const http = require('http')


const server = http.createServer((req,res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('Hello World\n')
})

server.listen(12010)

server.on('upgrade',(req, socket, upgradeHead) => {
  let head = new Buffer(upgradeHead.length)
  upgradeHead.copy(head)
  let key = req.headers['sec-websocket-key']
  const shasum = crypto.createHash('sha1')
  key = shasum.update(`${key}258EAFA5-E914-47DA-95CA-C5AB0DC85B11`).digest('base64')
  const headers = [
    'HTTP/1.1 101 Switching Protocols',
    'Upgrade: websocket',
    'Connection: Upgrade',
    `Sec-WebSocket-Accept: ${key}`,
    `Sec-WebSocket-Protocol: ${protocol}`
  ]
  socket.setNoDelay(true)
  socket.write(headers.concat('', '').join('\r\n'))
  WebSocket.prototype.setSocket = (socket) => {
    this.socket = socket
    this.socket.on('data', this.receiver)
  }
  WebSocket.prototype.send = (data) => {
    this._send(data)
  }
  const websocket = new WebSocket()  
  WebSocket.setSocket(socket)
})
