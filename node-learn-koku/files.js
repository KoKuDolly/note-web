const http = require('http')
const fs = require('fs')
const path = require('path')
const moment = require('moment')
const template = require('art-template')

template.defaults.imports.dateFormat = function (date, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(date).format(pattern)
}

const server = http.createServer()

server.on('request', function (req, res) {
  const url = req.url

  if (url === '/') {
    fs.readdir(__dirname, (err, filenames) => {
      if (err) throw err

      let filesInfoList = [], fileList = [], dirList = []
      let c = 0 // 这个标识符比 forEach 里的 index 参数更靠谱
      filenames.forEach((filename, i) => {
        fs.stat(path.join(__dirname, filename), (err, stats) => {
          const info = {
            name: filename,
            size: stats.size,
            mTime: stats.mtime,
            isFile: stats.isFile()
          }

          if (stats.isFile()) {
            fileList.push(info)
          } else {
            dirList.push(info)
          }

          c++

          if (c === filenames.length) {
            dirList.sort(sortFiles)
            fileList.sort(sortFiles)
            filesInfoList = dirList.concat(fileList)
            const htmlStr = template(__dirname + '/views/files.html', { list: filesInfoList })
            res.end(htmlStr)
          }
        })
      })
    })
  } else {
    res.end('404.')
  }
})

server.listen(3001, function() {
  console.log('server listen at http://localhost:3001')
})

function sortFiles(f1, f2) {
  var n1 = f1.name
  var n2 = f2.name
  if (n1 < n2) {
    return -1
  } else {
    return 1
  }
}