'use strict'
// 1.判断对象的数据类型
// 不推荐将这个函数用来检测可能会产生包装类型的基本数据类型上,因为 call 会将第一个参数进行装箱操作
export const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target)

export const isArray = isType('Array')

// 2. ES5 实现数组 map 方法

export const selfMap = function(fn, context) {
  let arr = Array.prototype.slice.call(this)
  let mappedArr = []
  for (let i = 0; i < arr.length; i++) {
    if (!arr.hasOwnProperty(i)) continue
    mappedArr.push(fn.call(context, arr[i], i, this))
  }
  return mappedArr
}

// 3. 使用 reduce 实现数组 map 方法

export const selfMap2 = function(fn, context) {
  let arr = Array.prototype.slice.call(this)
  return arr.reduce((pre, cur, index) => {
    return [...pre, fn.call(context, cur, index, this)]
  }, [])
}

// 4. ES5 实现数组 filter 方法

export const selfFilter = function(fn, context) {
  let arr = Array.prototype.slice.call(this)
  let filteredArr = []
  for (let i = 0; i < arr.length; i++) {
    if (!arr.hasOwnProperty(i)) continue
    fn.call(context, arr[i], i, this) && filteredArr.push(arr[i])
  }
  return filteredArr
}

// 5. 使用 reduce 实现数组 filter 方法

export const selfFilter2 = function(fn, context) {
  return this.reduce((pre, cur, index) => {
    return fn.call(context, cur, index, this) ? [...pre, cur] : [...pre]
  }, [])
}

// 6. ES5 实现数组的 some 方法

export const selfSome = function(fn, context) {
  let arr = Array.prototype.slice.call(this)
  if (!arr.length) return false
  let flag = false
  for (let i = 0; i < arr.length; i++) {
    if (!arr.hasOwnProperty(i)) continue
    let res = fn.call(context, arr[i], i, this)
    if (res) {
      flag = true
      break
    }
  }
  return flag
}

// 7. ES5 实现数组的 reduce 方法

export const findRealElementIndex = function(arr, initIndex) {
  let index
  for (let i = initIndex || 0; i < arr.length; i++) {
    if (!arr.hasOwnProperty(i)) continue
    index = i
    break
  }
  return index
}

export const selfReduce = function(fn, initialValue) {
  let arr = Array.prototype.slice.call(this)
  let res

  if (initialValue === undefined) {
    res = arr[findRealElementIndex(arr)]
    for (let i = 0; i < arr.length - 1; i++) {
      if (!arr.hasOwnProperty(i)) continue
      let realElementIndex = findRealElementIndex(arr, i + 1)
      res = fn.call(null, res, arr[realElementIndex], realElementIndex, this)
    }
  } else {
    res = initialValue
    for (let i = 0; i < arr.length; i++) {
      if (!arr.hasOwnProperty(i)) continue
      res = fn.call(null, res, arr[i], i, this)
    }
  }
  return res
}

// 8. 使用 reduce 实现数组的 flat 方法

export const selfFlat = function(depth = 1) {
  let arr = Array.prototype.slice.call(this)
  if (depth === 0) return arr
  return arr.reduce((pre, cur) => {
    if (Array.isArray(cur)) {
      return [...pre, ...selfFlat.call(cur, depth - 1)]
    } else {
      return [...pre, cur]
    }
  }, [])
}

// 9. 实现 ES6 的 class 语法

export function inherit (subType, superType) {
  subType.prototype = Object.create(superType.prototype, {
    constructor: {
      enumerable: false,
      configurable: true,
      writable: true,
      value: superType.constructor
    }
  })
  // 继承函数
  Object.setPrototypeOf(subType, superType)
}

/*
ES6 的 class 内部是基于寄生组合式继承，它是目前最理想的继承方式，通过 Object.create 方法创造一个空对象，并将这个空对象继承 Object.create 方法的参数，再让子类（subType）的原型对象等于这个空对象，就可以实现子类实例的原型等于这个空对象，而这个空对象的原型又等于父类原型对象（superType.prototype）的继承关系

而 Object.create 支持第二个参数，即给生成的空对象定义属性和属性描述符/访问器描述符，我们可以给这个空对象定义一个 constructor 属性更加符合默认的继承行为，同时它是不可枚举的内部属性（enumerable:false）

而 ES6 的 class 允许子类继承父类的静态方法和静态属性，而普通的寄生组合式继承只能做到实例与实例之间的继承，对于类与类之间的继承需要额外定义方法，这里使用 Object.setPrototypeOf 将 superType 设置为 subType 的原型，从而能够从父类中继承静态方法和静态属性
*/

// 10. 函数柯里化

export function curry(fn) {
  if (fn.length <= 1) return fn
  const generator = (...args) => {
    if (fn.length === args.length) {
      return fn(...args)
    } else {
      return (...args2) => {
        return generator(...args, ...args2)
      }
    }
  }
  return generator
}

// 使用方法

let add = (a, b, c, d) => a + b + c + d
const curriedAdd = curry(add)
curriedAdd(5)(6)(7)(8)
add(5, 6, 7, 8)

// 11. 函数柯里化（支持占位符）

export const curry2 = (fn, placeholder = '_') => {
  curry2.placeholder = placeholder
  if (fn.length <= 1) return fn
  let argsList = []
  const generator = (...args) => {
    let currentPlaceholderIndex = -1
    args.forEach(arg => {
      let placeholderIndex = argsList.findIndex(arg => arg === curry2.placeholder)
      if (placeholderIndex < 0) {
        currentPlaceholderIndex = argsList.push(arg) - 1
      } else if (placeholderIndex !== currentPlaceholderIndex) {
        argsList[placeholderIndex] = arg
      } else {
        argsList.push(arg)
      }
    })
    let realArgList = argsList.filter(arg => arg !== curry2.placeholder)
    if (realArgList.length === fn.length) {
      return fn(...argsList)
    } else if (realArgList.length > fn.length) {
      throw new Error('超出初始函数参数最大值')
    } else {
      return generator
    }
  }
  return generator
}

// 12. 偏函数

export const partialFunc = (func, ...args) => {
  let placeholderNum = 0
  return (...args2) => {
    args2.forEach(arg => {
      let index = args.findIndex(item => item === '_')
      if (index < 0) return
      args[index] = arg
      placeholderNum++
    })
    if (placeholderNum < args2.length) {
      args2 = args2.slice(placeholderNum, args2.length)
    }
    return func.apply(this, [...args, ...args2])
  }
}

// 13. 斐波那契数列及其优化

export const fibonaccil = function (n) {
  if (n < 1) throw new Error('参数错误')
  if (n === 1 || n === 2) return 1
  return fibonaccil(n - 1) + fibonaccil(n - 2)
}

// 函数记忆

export const memory = function (fn) {
  let obj = {}
  return function (n) {
    if (!obj[n]) obj[n] = fn(n)
    return obj[n]
  }
}
export const fibonaccil2 = memory(fibonaccil)

// 14. 实现函数 bind 方法

export const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && obj !== null

export const selfBind = function(bindTarget, ...args1) {
  if (typeof this !== 'function') {
    throw new TypeError('Bind must be called on a function')
  }

  let func = this
  let boundFunc = function(...args2) {
    let args = [...args1, ...args2]
    if (new.target) {
      let res = func.apply(this, args)
      if (isComplexDataType(res)) return res
      return this
    } else {
      func.apply(bindTarget, args)
    }
  }

  this.prototype && (boundFunc.prototype = Object.create(this.prototype))

  let desc = Object.getOwnPropertyDescriptors(func)
  Object.defineProperties(boundFunc, {
    length: desc.length,
    name: Object.assign(desc.name, {
      value: `bound${desc.name.value}`
    })
  })
  return boundFunc
}

// 15. 实现函数 call 方法

export const selfCall = function(context, ...args) {
  let func = this
  context || (context = window)

  if (typeof func !== 'function') throw new TypeError('this is not function')
  let caller = Symbol('caller')
  context[caller] = func
  let res = context[caller](...args)
  delete context[caller]
  return res
}

// 16. 简易的 CO 模块

export function run (generatorFunc) {
  let it = generatorFunc()
  let result = it.next()

  return new Promise((resolve, reject) => {
    const next = function(result) {
      if (result.done) {
        resolve(result.value)
      }
      result.value = Promise.resolve(result.value)
      result.value
        .then(res => {
          let result = it.next(res)
          next(result)
        })
        .catch(err => {
          reject(err)
        })
    }
    next(result)
  })
}

// 17. 函数防抖

export const debounce = (
  func,
  time = 17,
  options = {
    leading: true,
    trailing: true,
    context: null
  }
) => {
  let timer
  const _debounce = function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    if (options.leading && !timer) {
      timer = setTimeout(null, time)
      func.apply(options.context, args)
    } else if (options.trailing) {
      timer = setTimeout(() => {
        func.apply(options.context, args)
        timer = null
      }, time)
    }
  }

  _debounce.cancel = function() {
    clearTimeout(timer)
    timer = null
  }
  return _debounce
}

// 18. 函数节流

export const throttle = (
  func,
  time = 17,
  options = {
    leading: true,
    trailing: false,
    context: null
  }
) => {
  let previous = new Date(0).getTime()
  let timer
  const _throttle = function(...args) {
    let now = new Date().getTime()

    if (!options.leading) {
      if (timer) return
      timer = setTimeout(() => {
        timer = null
        func.apply(options.context, args)
      }, time)
    } else if (now - previous > time) {
      func.apply(options.context, args)
      previous = now
    } else if (options.trailing) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(options.context, args)
      }, time)
    }
  }

  _throttle.cancel = () => {
    previous = 0
    clearTimeout(timer)
    timer = null
  }
  return _throttle
}

// 19. 图片懒加载

let imgList = [...document.querySelectorAll('img')]
let num = imgList.length

export let lazyLoad = (function() {
  let count = 0
  return function() {
    let deleteIndexList = []
    imgList.forEach((img, index) => {
      let rect = img.getBoundingClientRect()
      if (rect.top < window.innerHeight) {
        img.src = img.dataset.src
        deleteIndexList.push(index)
        count++
        if (count === num) {
          document.removeEventListener('scroll', lazyLoad)
        }
      }
    })
    imgList = imgList.filter((_, index) => !deleteIndexList.includes(index))
  }
})()

export let lazyLoad1 = function() {
  let observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        entry.target.src = entry.target.dataset.src
        observer.unobserve(entry.target)
      }
    })
  })
  imgList.forEach(img => {
    observer.observe(img)
  })
}

// 20. new 关键字

export const selfNew = function(fn, ...rest) {
  let instance = Object.create(fn.prototype)
  let res = fn.apply(instance, rest)
  return isComplexDataType(res) ? res : instance
}

// 21. 实现 Object.assign

export const selfAssign = function(target, ...source) {
  if (target === null) throw new TypeError('Cannot convert undefined or null to object')
  return source.reduce((acc, cur) => {
    isComplexDataType(acc) || (acc = new Object(acc))
    if (cur === null) return acc
    ;[...Object.keys(cur), ...Object.getOwnPropertySymbols(cur)].forEach(key => {
      acc[key] = cur[key]
    })
    return acc
  }, target)
}

// 22. instanceof

export const seltInstanceof = function(left, right) {
  let proto = Object.getPrototypeOf(left)
  while (true) {
    if (proto === null) return false
    if (proto === right.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}

// 23. 私有变量的实现

export const proxy = function(obj) {
  return new Proxy(obj, {
    get(target, key) {
      if (key.startsWith('_')) {
        throw new Error('private key')
      }
      return Reflect.get(target, key)
    },
    ownKeys(target) {
      return Reflect.ownKeys(target).filter(key => !key.startsWith('_'))
    }
  })
}

export const Person = (function() {
  const _name = Symbol('name')

  class Person {
    constructor(name) {
      this[_name] = name
    }

    getName() {
      return this[_name]
    }
  }
  return Person
})()

export class Person2 {
  constructor(name) {
    let _name = name
    this.getName = function() {
      return _name
    }
  }
}

export const Person3 = (function() {
  let wp = new WeakMap()

  class Person {
    constructor(name) {
      wp.set(this, { name })
    }

    getName() {
      return wp.get(this).name
    }
  }
  return Person
})()

// 24. 洗牌算法

export function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    let randomIndex = i + Math.floor(Math.random() * (arr.length - 1))
    ;[arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]]
  }
  return arr
}

export function shuffle2(arr) {
  let _arr = []
  while (arr.length) {
    let randomIndex = Math.floor(Math.random() * arr.length)
    _arr.push(arr.splice(randomIndex, 1)[0])
  }
  return _arr
}

// 25. 单例模式

export function proxy2(func) {
  let instance
  let handler = {
    constructor(target, args) {
      if (!instance) {
        instance = Reflect.construct(func, args)
      }
      return instance
    }
  }
  return new Proxy(func, handler)
}

// 26. promisify

const fs = require('fs')

export function promisify(asyncFunc) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      args.push(function callback(err, ...values) {
        if (err) return reject(err)
        return resolve(...values)
      })
      asyncFunc.call(this, ...args)
    })
  }
}

export const fsp = new Proxy(fs, {
  get(target, key) {
    return promisify(target[key])
  }
})

// await fsp.readFile('./promisify.js', 'utf-8')
// await fsp.writeFile('./promisify.js', data)

// 27. 优雅的处理 async/await

export async function errorCaptured (asyncFunc) {
  try {
    let res = await asyncFunc()
    return [null, res]
  } catch (e) {
    return [e, null]
  }
}

// 28. 发布订阅 EventEmitter

export class EventEmitter {
  constructor() {
    this.subs = {}
  }

  on(event, cb) {
    (this.subs[event] || (this.subs[event] = [])).push(cb)
  }

  trigger(event, ...args) {
    this.subs[event] &&
      this.subs[event].forEach(cb => {
        cb(...args)
      })
  }

  once(event, onceCb) {
    const cb = (...args) => {
      onceCb(...args)
      this.off(event, onceCb)
    }
    this.on(event, cb)
  }

  off(event, offCb) {
    if (this.subs[event]) {
      let index = this.subs[event].findIndex(cb => cb === offCb)
      this.subs[event].splice(index, 1)
      if (!this.subs[event].length) delete this.subs[event]
    }
  }
}
