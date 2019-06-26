/**
 * some config
 */
let apiBaseUrl = '/';
const PROJECT_NAME = 'app';
let xxxUrl = '//xxx.domain.cn'; // 生产
// let xxxUrl = 'Protocol://ip:port'; // 预发、测试

if (process.env.NODE_ENV === 'development') {
  apiBaseUrl = '';
  xxxUrl = 'Protocol://ip:port';
} else if (process.env.NODE_ENV === 'alphaBeta') {
  apiBaseUrl = '/';
  xxxUrl = 'Protocol://ip:port';
}

module.exports = {
  apiBaseUrl,
  systemName: '',
  PName: '/' + PROJECT_NAME,
  xxxUrl
};
