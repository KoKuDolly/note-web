/*
 * @Descripttion:
 * @version:
 * @Author: jiajun.qin
 * @Date: 2020-08-04 10:57:43
 * @LastEditors: jiajun.qin
 * @LastEditTime: 2020-08-04 14:49:56
 */

// 基于Promise 对象的自动执行器
function run(gen) {
  var g = gen();

  function next(data) {
    var result = g.next(data);
    if (result.done) return result.value;
    result.value.then(function (data) {
      next(data);
    });
  }

  next();
}
// run(gen);

// co源码，基于Promise 对象的自动执行器的扩展，增加了错误处理和参数类型校验
// https://github.com/tj/co/blob/master/index.js

function co(gen) {
  const ctx = this;
  return new Promise((resolve, reject) => {
    if (typeof gen === "function") {
      gen = gen.call(ctx);
    }
    if (!gen || typeof gen.next !== "function") {
      return resolve(gen);
    }

    onFulfilled();
    function onFulfilled(res) {
      let ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    function onRejected(err) {
      var ret;
      try {
        ret = gen.throw(err);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    function next(ret) {
      if (ret.done) {
        return resolve(ret.value);
      }
      const value = toPromise.call(ctx, ret.value);
      if (value && isPromise(value)) {
        return value.then(onFulfilled, onRejected);
      }
      return onRejected(
        new TypeError(
          "You may only yield a function, promise, generator, array, or object, " +
            'but the following object was passed: "' +
            String(ret.value) +
            '"'
        )
      );
    }
  });
}