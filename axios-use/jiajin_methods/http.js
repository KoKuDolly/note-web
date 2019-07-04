// 引入axios以及element ui中的loading和message组件
import axios from 'axios'
import store from '../vuex/store'
import { Loading, Message, Notification } from 'element-ui'
import Router from '../router'
// import querystring from 'querystring'
// import router from '../router'

// 超时时间
axios.defaults.timeout = 50000
// 设置请求头  Content-Type:multipart/form-data;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
// 让ajax携带cookie
// axios.defaults.withCredentials = true
// 默认loading
axios.defaults.showloading = true
// http请求拦截器
// let loadinginstace

// 多次请求loading处理
let loading // 定义loading变量
function startLoading () {
  // 使用Element loading-start 方法
  loading = Loading.service({
    fullscreen: true,
    background: 'rgba(0, 0, 0, 0.5)'
    // 子路由加载
    // target: document.querySelector('.loadingtext')
  })
}

function endLoading () {
  // 使用Element loading-close 方法
  if (loading) {
    loading.close()
  }
}
let needLoadingRequestCount = 0

function showFullScreenLoading () {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

function tryHideFullScreenLoading () {
  if (needLoadingRequestCount > 0) {
    needLoadingRequestCount--
  }
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}
// 请求中断处理
const CancelToken = axios.CancelToken
let source = CancelToken.source()

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 切换路由阻断处理
    config.cancelToken = source.token
    if (config.showloading) {
      showFullScreenLoading()
    }
    // token 添加
    if (store.state.common.userInfo) {
      config.params = {
        token: store.state.common.userInfo.token,
        ...config.params
      }
      // config.headers.token = store.state.common.userInfo.token
    }
    // console.log('请求', config)
    return config
  },
  error => {
    tryHideFullScreenLoading()
    // loadinginstace.close()
    Message.error({
      showClose: true,
      message: '请求超时'
    })
    return Promise.reject(error)
  }
)
// http响应拦截器
axios.interceptors.response.use(
  data => {
    // 响应成功关闭loading
    // console.log('响应数据', data)
    tryHideFullScreenLoading()
    return data.data
  },
  error => {
    console.log(error)
    // loadinginstace.close()
    tryHideFullScreenLoading()
    if (error.message !== 'breakRequest') { // 切换中断不做处理
      // 错误处理
      if (error && error.response) {
        switch (error.response.status) {
          case 400: error.message = '请求错误(400)'; break
          case 401: error.message = '未授权，请重新登录(401)'; break
          case 403: error.message = '拒绝访问(403)'; break
          case 404: error.message = '请求出错(404)'; break
          case 408: error.message = '请求超时(408)'; break
          case 500: error.message = '服务器错误(500)'; break
          case 501: error.message = '服务未实现(501)'; break
          case 502: error.message = '网络错误(502)'; break
          case 503: error.message = '服务不可用(503)'; break
          case 504: error.message = '网络超时(504)'; break
          case 505: error.message = 'HTTP版本不受支持(505)'; break
          default: error.message = `连接出错(${error.response.status})!`
        }
      } else {
        error.message = '连接服务器失败!'
      }
      Notification.error({
        showClose: true,
        message: error.message
      })
    }

    return Promise.reject(error)
  }
)
// 切换路由中断请求
Router.beforeEach((to, from, next) => {
  source.cancel('breakRequest')
  const CancelToken = axios.CancelToken
  source = CancelToken.source()
  next()
})

export default axios
