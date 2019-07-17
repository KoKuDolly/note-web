// let obj = {1:222, 2:123, 5:888};
// obj.length = 12;
// let _obj = Array.from(obj).slice(1);
// let newObj =  _obj.map((item) => {if(item === undefined) {return null;} else {return item;}});
// console.log(newObj);

// 2
// let obj = {1:222, 2:123, 5:888};
// obj.length = 12;
// obj[Symbol.iterator] = Array.prototype[Symbol.iterator];
// let _obj = [...obj].slice(1);
// let newObj =  _obj.map((item) => {if(item === undefined) {return null;} else {return item;}});
// console.log(newObj);

// ! 上面两种少长度了，不符合

// 3
// let obj = {1:222, 2:123, 5:888};
// let result = Array.from({length:12},(item,index)=>obj[index+1]||null)
// console.log(result)

// 4

// console.time()
// let obj = {1:222, 2:123, 5:888};
// let res = Array.from({length:12}).fill(null);
// Object.keys(obj).forEach(it=>res[it-1] = obj[it]);
// console.log(res);
// // default: 0.7451171875ms
// console.timeEnd();


// console.time();
// let data = {1:222, 2:123, 5:888};
// let arr = Array.from({length:12}).map((it,i)=> data[i+1]||null);
// console.log(arr);
// // default: 2.119873046875ms
// console.timeEnd();

// 5

// function arrToObject(obj) {
//   let arr = [];
//   for (let i = 0; i < 12; i++) {
//     arr.push(null)
//     for (let key in obj) {
//       if(key == (i+1)){
//         arr.splice(i, 1, obj[key])
//       }
//     }
//   }
//   return arr;
// };
// let obj = {1:222, 2:123, 5:888};

// 6

// var obj = {1:222, 2:123, 5:888}

// var c = new Array(12).fill(true).reduce((prev, cur, key) => {
//   prev[key] = obj[key + 1] || null
//   return prev
// }, [])

// 1-12月份的销售额；
// var obj = {
//   1: 222,
//   2: 123,
//   5: 888,
// }
// var arr = new Array(12).fill(null);
// var finalArr = arr.map((v, i, curr) => {
//   if (obj[i + 1]) {
//     return obj[i + 1];
//   } else {
//     return null;
//   }
// });
// console.log('--log--:', finalArr)

// 8

// let obj = {1:222, 2:123, 5:888};
// const result = Array.from({ length: 12 }).map((_, index) => obj[index + 1] || null);
// console.log(result)