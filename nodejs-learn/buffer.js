// import { Buffer } from 'buffer';

const http = require('http')
let hellworld = ''
for(let i = 0; i< 1024*10;i++){
  hellworld += 'a'
}
hellworld = new Buffer(hellworld)
http.createServer((req,res)=>{
  res.writeHead(200)
  res.end(hellworld)
}).listen(8001)

