// 下载文件的方式
// 1. a 标签 a.href <==> location.href
// 2. form 表单提交
// 3. blob 格式
// 4. arraybuffer 格式

/**
 * 方式1
 * @param {*} url 
 * @param {*} filename
 * @description 通过 a 标签
 * 通过a标签实现下载的数据格式为：下载文件的url地址，所以从后台获取数据时得到的是url格式
 * 与后台的交互方式为 ：ajax、get等http请求
 */
export function aEleDownload(url, filename, isBlob = false) {
  const aEle = document.createElement('a')
  aEle.download = filename
  aEle.style.display = 'none'
  if (isBlob) {
    let blob = null
    try {
      blob = new Blob([url], { type: 'application/zip' })
    } catch (e) {
      window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder
      if (e.name === 'TypeError' && window.BlobBuilder) {
        const blobbuilder = new BlobBuilder()
        blobbuilder.append(url)
        blob = blobbuilder.getBlob('application/zip')
      } else {
        alert('浏览器版本较低，暂不支持该文件类型下载')
      }
    }
    aEle.href = URL.createObjectURL(blob)
  } else {
    aEle.href = url
  }
  document.body.appendChild(aEle)
  aEle.click()
  document.body.removeChild(aEle)
}
/**
 * 方式2
 * @param {*} url 
 * @param {*} data 
 * @param {*} method
 * @description form表单 原生方法，也可以用jQuery，也可以通过 iframe 和 form 配合
 */
export function formDownload(url = '', data = {}, method = 'post') {
  const formEle = document.createElement('form')
  formEle.style.display = 'none'
  formEle.target = ''
  formEle.method = method
  formEle.action = url // setAttribute('action', url)
  for (const key in data) {
    const input = document.createElement('input')
    input.type = hidden
    input.name = key
    input.value = data[key]
    formEle.appendChild(input)
  }
  document.body.appendChild(formEle)
  formEle.submit()
  formEle.remove()
}

// utils.js
export const download = (res, type, filename) => {
  // 创建blob对象，解析流数据
  const blob = new Blob([res], {
    // 如何后端没返回下载文件类型，则需要手动设置：type: 'application/pdf;chartset=UTF-8' 表示下载文档为pdf，如果是word则设置为msword，excel为excel
    type: type
  })
  const a = document.createElement('a')
  // 兼容webkix浏览器，处理webkit浏览器中href自动添加blob前缀，默认在浏览器打开而不是下载
  const URL = window.URL || window.webkitURL
  // 根据解析后的blob对象创建URL 对象
  const herf = URL.createObjectURL(blob)
  // 下载链接
  a.href = herf
  // 下载文件名,如果后端没有返回，可以自己写a.download = '文件.pdf'
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  // 在内存中移除URL 对象
  window.URL.revokeObjectURL(herf)
}

// 引入下载方法
// import {download} from 'utils'
// export default{
//   methods: {
//     async downloadFile () {
//       let res = await axios.get(
//         url: 'xxxx/xxxx',
//         method: 'GET',
//         // 设置返回数据类型，这里一定要设置，否则下载下来的pdf会是空白,也可以是`arraybuffer`
//         responseType: 'blob',
//         params: {
//           id: 'xxxxxx'
//         }
//       )
//       // 获取在response headers中返回的下载文件类型
//       let type = JSON.parse(res.headers)['content-type']
      
//       /*获取在response headers中返回的下载文件名
//         因为返回文件名是通过encodeURIComponent()函数进行了编码，因此需要通过decodeURIComponent()函数解码
//       */
//       let fileName = decodeURIComponent(JSON.parse(res.headers)['file-name'])
//       // 调用封装好的下载函数
//       download(res, type, fileName)
//     }
//   }
// }
