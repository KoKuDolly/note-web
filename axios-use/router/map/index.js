/**
 * 不同功能模块的路由应代码分离
 */

// 权限管理
import auth from './auth';


const Layout = () => import('@/pages/layout/');
const Home = () => import('@/pages/home/');
const Login = () => import('@/pages/login/');
const NotFound = () => import('@/pages/notFound/');

export default [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    name: '/',
    children: [
      // 地址为空时跳转home页面
      {
        path: '',
        redirect: '/home'
      },
      {
        path: '/home',
        name: 'home',
        meta: {
          title: 'home'
        },
        component: Home
      },
      {...auth},
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      { // 404 置后
        path: '/404',
        name: '404',
        component: NotFound
      },
      {
        path: '*',
        redirect: '/404'
      }
    ]
  }

];
