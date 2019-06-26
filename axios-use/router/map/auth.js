/**
 * 权限管理
 */

import AUTH_CONSTS from '@/utils/AUTH_CONSTS';

const {
  AUTH_MANAGEMENT_PAGE,
  LIST_MANAGE_PAGE,
  PAGE_AUTH_MANAGE_PAGE,
  USER_AUTH_MANAGE_PAGE,
  ROLE_AUTH_MANAGE_PAGE
} = AUTH_CONSTS;

const Auth = () => import('@/pages/auth/');
const ProdWodMag = () => import('@/pages/auth/prodWordMag/');
const PageAuth = () => import('@/pages/auth/pageAuth/');
const UserAuth = () => import('@/pages/auth/userAuth/');
const RoleAuth = () => import('@/pages/auth/roleAuth/');

export default {
  path: 'auth',
  name: AUTH_MANAGEMENT_PAGE,
  redirect: '/auth/prodWord',
  meta: {
    title: '权限管理'
  },
  component: Auth,
  children: [
    {
      path: 'prodWord',
      name: LIST_MANAGE_PAGE,
      meta: {
        title: '列表管理'
      },
      component: ProdWodMag
    },
    {
      path: 'pageAuth',
      name: PAGE_AUTH_MANAGE_PAGE,
      meta: {
        title: '页面权限'
      },
      component: PageAuth
    },
    {
      path: 'userAuth',
      name: USER_AUTH_MANAGE_PAGE,
      meta: {
        title: '用户权限'
      },
      component: UserAuth
    },
    {
      path: 'roleAuth',
      name: ROLE_AUTH_MANAGE_PAGE,
      meta: {
        title: '角色权限'
      },
      component: RoleAuth
    }
  ]
};
