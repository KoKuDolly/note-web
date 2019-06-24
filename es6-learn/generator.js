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