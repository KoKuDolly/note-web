const fs = require('fs');

// 方法1：回调地狱法
// fs.readFile('./files/1.txt', 'utf-8', (err, data) => {
//   fs.readFile('./files/2.txt', 'utf-8', (err, data) => {
//     fs.readFile('./files/3.txt', 'utf-8', (err, data) => {
//       //...
//     })
//   })
// })

// 方法2：数组法
const arr = [
  function(callback) {
    return fs.readFile('./files/1.txt', 'utf-8', callback);
  },
  function(callback) {
    return fs.readFile('./files/2.txt', 'utf-8', callback);
  },
  function(callback) {
    return fs.readFile('./files/3.txt', 'utf-8', callback);
  }
];

function run (arr) {
  function next(i = 0, preData) {
    if (i === arr.length) {
      // 这里异步操作全部结束，做点别的？
      // console.log(arr, JSON.stringify(arr))
      return;
    }
    const fn = arr[i];
    fn(function(err, data) {
      if (err) throw err;
      // arr[i] = data;
      console.log(preData, data);
      next(++i, data);
    });
  };
  next(0);
};

run(arr);

// console.log(JSON.stringify(function(){}))

// 方法3： generator函数法

function* gen() {
  yield cb => fs.readFile('./files/1.txt', 'utf-8', cb);
  yield cb => fs.readFile('./files/2.txt', 'utf-8', cb);
  yield cb => fs.readFile('./files/3.txt', 'utf-8', cb);
}

function runs(fn) {
  const g = fn();
  function next(err, data) {
    // 本例子，这里打印四次，第一次忽略
    console.log(err, data);
    const result = g.next();
    if (result.done) return;
    result.value(next);
  };
  next();
}

runs(gen);