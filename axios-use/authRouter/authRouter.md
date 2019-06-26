# auth-router

> 项目下的路由权限控制

## 背景

产品项目经常会有针对不同的客户类型，开放不同的功能权限，这些权限可能包括：

- 产品权限

- 界面级（路由）权限

- 按钮级权限

- 数据接口`api`权限

这次主要是对于路由权限进行监控。

## 解决方式

> 基于xxx权限菜单树返回数据进行监控。

由于目前xxx实际上每个产品项目，前端已经预置了一套项目路由开发，**的菜单Menu及本项目内置nav是采用路由name跳转的**，所以主要通过获取到当前项目的菜单数据，**权限菜单树配置某个协商好的属性采用router-name配置**。

- 注册`router-tree`在`~router/index.js`

```js

import authRouter from '@/utils/authRouter';
...

// authRouter.setRouters(routers);
authRouter._observer();

function checkRouter (to) { // 检查路由权限，放置router.beforeEach中监控
  return authRouter.hasAuth(to.name);
}

router.beforeEach((to, from, next) => {
  ...
  if (checkRouter(to)) {
    next();
  } else {
    next('/404');
  }
  ...

})

```

- 获取权限数据 `auth.js`[举例，路由权限随用户信息返回]

```js
import authRouter from '@/utils/authRouter';
...
  ...
  register (user) {
    const data = user.routerList
    authRouter.setAuthData(data);
  ...
  }

...

```

> **注意**，项目中的路由最好定义为`tree`结构，如果是平级结构，暂不支持[可以通过meta中去定义父级`name`，来体现出`tree`结构]

### events

- **setDefaultPaths**: `Array`，设置默认路由
- **setAuthKey**: `String`，设置权限判断key, 包含权限数据及路由数据
- **_observer**: `func`，监听权限数据变化，重新权限判断 isAuthData
- **setAuthData**: `Array`，处理权限数据
- **setRouters**: `Array`，处理项目路由数据
- **hasAuth**: `key, String`，判断是否有数据

## 总结

总结一下，其实前端在做权限控制的时候，依赖于后端 API 返回的配置信息，所以在权限设计，路由设计，数据结构设计的时候，前后端一定要约定好。