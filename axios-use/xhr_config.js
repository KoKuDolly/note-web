import {xhr} from '@bairong/jax-core';
// import router from '@/router/';
import {Message} from 'iview';
import auth from './auth';
import {apiBaseUrl} from './config';

let apiUrl = '';

xhr.getUrl = option => {
  if (option.baseUrl) {
    apiUrl = option.baseUrl + option.url;
    return {
      baseUrl: option.baseUrl,
      url: option.url
    };
  }
  apiUrl = apiBaseUrl + option.url;
  return {
    baseUrl: apiBaseUrl,
    url: option.url
  };
};

xhr.baseData = {
  t: Date.now()
};

// 全局 配置
xhr.defaultConfig = {
  timeout: 20000
};

xhr.success = (response) => {
  const res = response;
  let isSuccess = true;

  if (typeof res !== 'object') {
    Message.error(apiUrl + ': response data should be JSON');
    isSuccess = false;
  }
  switch (res.code) {
    case '000':
      isSuccess = true;
      break;
    case 200:
      isSuccess = true;
      break;
    case '004':
      auth.destroy();
      // router.push('/login');
      isSuccess = false;
      auth.toOutLogin();
      break;
    default:
      // Message.error(res.message || res.msg || 'unknown error');
      isSuccess = false;
  }

  return isSuccess;
};

xhr.error = (res) => {
  if (res.code) {
    Message.error(res.message || res.msg || 'unknown error');
  } else {
    Message.error('服务器开小差了！');
  }
  return res;
};
