// function Foo() {
//   var i = 0;
//   return function() {
//       console.log(i++);
//   }
// }

// var f1 = Foo(),
//   f2 = Foo();
// f1();
// f1();
// f2();

// function Fibonacci (n) {
//     if (n === 0) {
//         return 0;
//     } else if (n <=2) {
//         return 1;
//     } else {
//         return Fibonacci(n-1) + Fibonacci(n-2);
//     }
// }

// console.log(Fibonacci(12))

// 下面没用递归的效果更优--为什么呢？どうしで？なぜだろが
function Fibonacci (n) {
  let a = 1;
  let b = 1;
  let c = 0;
  if (n === 0) {
    return 0;
  } else if (n <= 2) {
    return 1;
  } else {
    for (let i = 3; i <= n; i++) {
      c = a + b;
      a = b;
      b = c;
    }
    return c;
  }
}

console.log(Fibonacci(12));