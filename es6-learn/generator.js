// 下面是二叉树的构造函数，
// 三个参数分别是左树、当前节点和右树
function Tree(left, label, right) {
  this.left = left;
  this.label = label;
  this.right = right;
}

// 下面是中序（inorder）遍历函数。
// 由于返回的是一个遍历器，所以要用generator函数。
// 函数体内采用递归算法，所以左树和右树要用yield*遍历
function* inorder(t) {
  if (t) {
    yield* inorder(t.left);
    yield t.label;
    yield* inorder(t.right);
  }
}

// 下面生成二叉树
function make(array) {
  // 判断是否为叶节点
  if (array.length == 1) return new Tree(null, array[0], null);
  return new Tree(make(array[0]), array[1], make(array[2]));
}
let tree = make([
  [
    ['a'], 'b', ['c']
  ], 'd', [
    ['e'], 'f', ['g']
  ]
]);

// console.log(tree)

// 遍历二叉树
// var result = [];
// for (let node of inorder(tree)) {
//   result.push(node);
// }

// result
// ['a', 'b', 'c', 'd', 'e', 'f', 'g']

// Tree {
//   left: {
//     Tree {
//       left: {
//         Tree {
//           left: null
//           label: 'a'
//           right: null
//         }
//       }
//       label: 'b'
//       right: {
//         Tree {
//           left: null
//           label: 'c'
//           right: null
//         }
//       }
//     }
//   }
//   label: 'd'
//   right: {
//     Tree {
//       left: {
//         Tree {
//           left: null
//           label: 'e'
//           right: null
//         }
//       }
//       label: 'f'
//       right: {
//         Tree {
//           left: null
//           label: 'g'
//           right: null
//         }
//       }
//     }
//   }
// }


// var clock = function* () {
//   // yield console.log('Tick!');
//   // yield console.log('Tock!');
//   yield 'Tick'
//   yield 'Tock'
// };


// clock().next()
// clock().next()

var clock = function* () {
  while (true) {
    console.log('Tick!');
    yield;
    console.log('Tock!');
    yield;
  }
};

var b = clock()
b.next()
b.next()
b.next()
b.next()
b.next()
b.next()
// console.log(b.next())
// console.log(b.next())


// 如果将 Generator 函数当作协程，完全可以将多个需要互相协作的任务写成 Generator 函数，它们之间使用yield表达式交换控制权。

// 包一层
function wrapper(generatorFunction) {
  return function (...args) {
    console.log(args)
    let generatorObject = generatorFunction(...args);
    generatorObject.next();
    return generatorObject;
  };
}

const wrapped = wrapper(function* () {
  console.log(`First input: ${yield}`);
  return 'DONE';
});

wrapped().next('hello!')

// function* a() {
//   console.log(`First input: ${yield}`);
//   return 'DONE';
// }
// const vv = a();
// vv.next();
// vv.next('hello!');

// Generator.prototype.throw()

// 这种函数体内捕获错误的机制，大大方便了对错误的处理。多个yield表达式，可以只用一个try...catch代码块来捕获错误。如果使用回调函数的写法，想要捕获多个错误，就不得不为每个函数内部写一个错误处理语句，现在只在 Generator 函数内部写一次catch语句就可以了。 -- 这句话有问题

// var gen = function* gen(){
//   try {
//     yield console.log('a');
//     yield console.log('b');
//     yield console.log('c');
//   } catch (e) {
//     console.log(e, '内部捕获')
//   }

//   yield console.log('d');
//   yield console.log('e');
// }

// var g = gen();
// try {
//   g.next()
//   // g.throw(1)
//   // g.throw(2)
//   g.next()
//   g.next()
//   g.next()
//   g.throw(1)
// } catch(e) {
//   console.log(e, '外部捕获')
// }

// g.next()
// g.next()
// g.next()
// g.next()
// g.throw(1)

// throw命令只能被外部try catch 语句捕捉
// generator.prototype.throw() 意思是在generator函数外部抛出一个错误，然后把这个错误传递到generator函数内部，throw方法的参数会被generator内部的try catch语句的catch接收作为catch的参数。假如generator内部没有部署 try catch 语句或者 try catch 部署的位置和 throw 将要执行的那个 yield 语句不匹配或者没有先 next() 启动，那么这个错误，先被 generator 函数接收，在 generator 函数内部出错，使得 generator 函数的状态变为 {value: undefined, done: true} ，并把这个错误抛出到外部。

// var g = function* () {
//   while (true) {
//     try {
//       yield;
//     } catch (e) {
//       if (e != 'a') throw e;
//       console.log('内部捕获', e);
//     }
//   }
// };

// var i = g();
// i.next();

// try {
//   i.throw('a')
//   i.throw('a')
//   i.throw('a')
//   i.throw('a')
// } catch (e) {
//   console.log('外部捕获', e);
// }

// Generator 函数体外抛出的错误，可以在函数体内捕获；反过来，Generator 函数体内抛出的错误，也可以被函数体外的catch捕获。

// 这句话可以这么总结
// Generator 函数体外抛出的错误，可以在函数体内捕获；== generator.prototype.throw() 就是外部抛出的错误，触发到内部；

// 反过来，Generator 函数体内抛出的错误，也可以被函数体外的catch捕获。
// 这句话意思是，不论是next执行过程中遇到的错，还是throw主动抛出的错误，都会反应到函数内部，函数内部做了try catch的合适处理的话，就不会出错，否则，先函数内部出错，再反应到函数外部。

// 也就是文档中的下面这句话

// 一旦 Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还调用next方法，将返回一个value属性等于undefined、done属性等于true的对象，即 JavaScript 引擎认为这个 Generator 已经运行结束了。

// 上面这句话，有点意思。执行过程出错，有好多情况，throw主动抛错是一种，next执行中，内部出错是一种。
// 没有被内部捕获的意思是：只要出错了，如果没被try catch正确处理的，都会先触发内部错误，导致函数状态 { value: undefined, done: true }。

function* foo() {
  var x = yield 3;
  try {
    var y = x.toUpperCase();
    yield y;
  } catch(e) {

  }
}

var it = foo();

it.next(); // { value:3, done:false }

try {
  it.next(42);
} catch (err) {
  console.log(err);
}

// yield* 表达式

let delegatedIterator = (function* () {
  yield 'Hello!';
  yield 'Bye!';
}());

let delegatingIterator = (function* () {
  yield 'Greetings!';
  yield* delegatedIterator;
  yield 'Ok, bye.';
}());

console.log(delegatingIterator, function* (){})
for(let value of delegatingIterator) {
  console.log(value);
}

// GeneratorFunction()  Object [Generator] {}