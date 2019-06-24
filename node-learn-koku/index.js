const http = require('http')
const template = require('art-template')

const server = http.createServer()

server.on('request', function(req, res) {
  const url = req.url
  const data = {
    title: '标题',
    list: [
      { id: 1, name: '1的内容' },
      { id: 2, name: '2的内容' },
      { id: 3, name: '3的内容' }
    ]
  }

  if (url === '/') {
    // fs.readFile(__dirname + '/views/index.html', 'utf-8', (err, buf) => {
    //   if (err) return res.end('404')
    //   // const render = template.compile(buf)
    //   // const htmlStr = render(data)

    //   const htmlStr = template.render(buf, data)
    //   res.end(htmlStr)
    // })

    const htmlStr = template(__dirname + '/views/index.html', data)
    res.end(htmlStr)
  }
})

server.listen(3000, function () {
  console.log('server listen at http://127.0.0.1:3000')
})