/**
 * ! 路由权限监控
 * @param {string} currentPath
 * @param {arrary} authPaths
 * @param {arrary, tree} routerTree
 * @returns {boolean}
 * @description 权限监控，router-name
 */

const isArray = arr => Array.isArray(arr);

function arrayTreeCallBack (treeNodes, Fn, options) {
  if (!treeNodes || !treeNodes.length) return;
  options = options || {};
  options.childrenKeyName = options.childrenKeyName || 'children';

  function treeMap (tree, parent) {
    return tree.map((item, i) => {
      item = Fn(item, parent, i);

      if (item[options.childrenKeyName] && item[options.childrenKeyName].length) {
        const children = item[options.childrenKeyName];
        item[options.childrenKeyName] = treeMap(children, item);
      }

      return item;
    });
  }

  return treeMap(treeNodes);
}

const defaultPaths = ['login', '404', 'home'];

const authRouter = {
  defaultPaths: defaultPaths,
  authkey: 'name',
  // 重写data 的 get set  更改数据的时候，触发watch 更新视图
  _observer: function () {
    const _this = this;
    let value = authRouter.isAuthData;
    Object.defineProperty(authRouter, 'isAuthData', {
      configurable: true, // 可删除
      enumerable: true, // 可遍历
      get () {
        return value; // 获取值
      },
      set (newVal) {
        if (value !== newVal) {
          value = newVal;
          _this.hasAuth(authRouter.currentName);
        }
      }
    });
  },
  setAuthKey: function (key = 'name') {
    authRouter.authkey = key;
  },
  setDefaultPaths: function (paths = []) {
    if (!isArray(paths)) {
      paths = [paths];
    }
    authRouter.defaultPaths = [...authRouter.defaultPaths, ...paths];
  },
  setAuthData: function (authPaths = []) {
    const authNames = [...authRouter.defaultPaths];
    const authkey = authRouter.authkey;
    if (!isArray(authPaths)) {
      authRouter.authNames = [...authNames];
      authRouter.authPaths = [];
      authRouter.isAuthData = false;
    } else {
      const authList = arrayTreeCallBack(authPaths, (item) => {
        item[authkey] && authNames.push(item[authkey]);
        return item;
      });

      authRouter.authNames = [...authNames];
      authRouter.authPaths = [...authList];
      authRouter.isAuthData = true;
    }
  },
  setRouters: function (tree = []) {
    const authkey = authRouter.authkey;
    const authRouterName = [];
    let routerTree = [];
    if (!isArray(tree)) {
      routerTree = [];
    } else {
      const newTree = arrayTreeCallBack(tree, (node, parent) => {
        node.pname = parent ? parent[authkey] : '';
        return node;
      });
      routerTree = [...newTree];
    }

    arrayTreeCallBack(authRouter.routerTree, (node) => {
      if (authRouterName.indexOf(node[authkey]) > -1) {
        return node;
      }

      if (node.pname && authRouterName.indexOf(node.pname) > -1) {
        if (authRouterName.indexOf(node[authkey]) > -1) {
          return node;
        } else {
          authRouterName.push(node[authkey]);
        }
      }
      return node;
    });
    authRouter.authRouterName = [...authRouterName];
    authRouter.routerTree = [...routerTree];
  },
  hasAuth: function (currentName = '') {
    // const authkey = authRouter.authkey;
    if (!authRouter.isAuthData) return true;
    let authNames = authRouter.authNames || [];
    // const authRouterName = authRouter.authRouterName || [];
    // const routerTree = authRouter.routerTree || [];

    // ! 如果未配置区分，隐藏页面，可以放开下面权限
    // arrayTreeCallBack(routerTree, (node) => {
    //   if (authNames.indexOf(node[authkey]) > -1) {
    //     return node;
    //   }

    //   if (node.pname && authNames.indexOf(node.pname) > -1) {
    //     if (authNames.indexOf(node[authkey]) > -1) {
    //       return node;
    //     } else {
    //       authNames.push(node[authkey]);
    //     }
    //   }
    //   return node;
    // });
    // console.log(authNames);
    authRouter.currentName = currentName;
    return authNames.indexOf(currentName) > -1;
  }
};

authRouter.setAuthKey();

export default authRouter;
