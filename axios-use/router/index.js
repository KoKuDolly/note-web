import Vue from 'vue';
import VueRouter from 'vue-router';
import iView from 'iview';
import {PName} from 'utils/config';
import auth from 'utils/auth';
import authRouter from '@/utils/authRouter';
import routes from './map/'; // 路由映射
import qs from 'qs';

Vue.use(VueRouter);
authRouter.setRouters(routes);
authRouter._observer();

// console.log(routes);

function checkRouter (to) {
  return authRouter.hasAuth(to.name);
}

const router = new VueRouter({
  // mode: 'hash|history|abstract',
  base: PName + '/',
  // linkActiveClass: 'router-link-active',
  // scrollBehavior: fn() {}
  routes
});

router.beforeEach((to, from, next) => {
  // authRouter.setAuthData(JSON.parse(localStorage.getItem('__REDUXUSER__')).data.permission);
  iView.LoadingBar.start();
  // let query = to.query;
  let search = window.location.search.replace('?', '');
  let query = search ? qs.parse(search) : null;
  // const LOGIN_PATH = '/home';
  // const TO_PATH = to.path;
  if (query && query.ticket) {
    auth.destroy();
  }
  if (query && !auth.isLoginIn()) {
    // (TO_PATH !== LOGIN_PATH) ? next({path: LOGIN_PATH, query: query}) : next();
    window.location.href = '//production.100credit.com/#/home?' + search;
  } else {
    if (checkRouter(to)) {
      next();
    } else {
      next('/404');
    }
  }
});

router.afterEach(() => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});

export default router;
