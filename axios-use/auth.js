/**
 * 当前用户状态
 */

import {xxxUrl} from './config';

const auth = {

  USER_KEY: '__REDUXUSER__',
  AUTH_KEY: '__AUTHDATA__',

  isLoginIn () {
    const user = JSON.parse(localStorage.getItem(auth.USER_KEY));
    // 用户处于登录状态的条件：本地存储以及 cookie 同时存在
    if (user) {
      auth.user = user;
      return true;
    } else {
      return false;
    }
  },

  getAuth () {
    return JSON.parse(localStorage.getItem(auth.AUTH_KEY));
  },

  register (user) {
    auth.user = user;
    // 用户信息（基本信息、权限等存放 localStorage，减少前后端通信）
    localStorage.setItem(auth.USER_KEY, JSON.stringify(user));
  },

  registerAuth (authData) {
    localStorage.setItem(auth.AUTH_KEY, JSON.stringify(authData));
  },

  destroy () {
    localStorage.removeItem(auth.USER_KEY);
    localStorage.removeItem(auth.AUTH_KEY);
  },
  toOutLogin () {
    auth.destroy();
    window.location.replace(xxxUrl);
  }
};

export default auth;
