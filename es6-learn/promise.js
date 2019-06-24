const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000);
});

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000);
});

console.log(p2.then(null, (err) => {
  console.log(err);
  return p1.constructor;
}));

// console.log(p1, p1.then().then());