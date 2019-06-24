// const socket = new WebSocket('ws://127.0.0.1:12010/updates')
// socket.onopen = () => {
//   setInterval(() => {
//     if (socket.bufferedAmount == 0) {
//       socket.send(getUpdateData())
//     }
//   },50)
// }
// socket.onmessage = (event) => {

// }


const WebSocket = (url) => {
  this.options = parseUrl(url)
  this.connect()
}
WebSocket.prototype.onopen = () => {

}
WebSocket.prototype.setSocket = (socket) => {
  this.socket = socket
}
WebSocket.prototype.connect = () => {
  const key = new Buffer(`${this.options.protocolVersion}-${Date.now}`).toString('base64')
  const shasum = crypto.createHash('sha1')
  const expected = shasum.update(`${key}258EAFA5-E914-47DA-95CA-C5AB0DC85B11`).digest('base64')
  const options = {
    port: this.options.port,
    host: this.options.hostname,
    headers: {
      'Connection': 'Upgrade',
      'Upgrade': 'websocket',
      'Sec-WebSocket-Version': this.options.protocolVersion,
      'Sec-WebSocket-Key': key
    }
  }
  const req = http.request(options)
  req.end()
  req.on('upgrade', (res, socket, upgradeHead) => {
    this.setSocket(socket)
    this.onopen()
  })
}