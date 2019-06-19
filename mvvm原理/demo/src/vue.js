/* Vue类，用于创建vue实例 */
class Vue {
  /* 构造函数 */
  constructor(options = {}) {
    this.$options = options
    this.$el = options.el
    this.$data = options.data
    // 将data中的数据代理到当前vue实例
    this.proxy(options.data)

    // 将methods中的数据代理到当前vue实例
    this.proxy(options.methods)

    // 监视数据变化
    observe(this.$data)

    // 创建一个编译器
    this.compiler = new Compiler(options.el, this)
  }

  proxy(data) {
    for (let key in data) {
      Object.defineProperty(this, key, {
        get: function() {
          return data[key]
        },
        set: function(newVal) {
          data[key] = newVal
        }
      })
    }
  }
}

/* 
  Compiler主要负责解析模板指令和插值表达式，将模板中的变量转换成数据
  然后渲染整个页面和视图
*/
class Compiler {
  // 构造器
  constructor(el, vm) {
    this.$vm = vm
    // 如果el是一个选择器，需要先获取到el元素
    this.$el = this.isElementNode(el) ? el : document.querySelector(el)
    // 如果元素存在
    if (this.$el) {
      // 把节点解析成文档碎片
      this.$fragment = this.node2fragment(this.$el)

      // 解析文档碎片
      this.compile(this.$fragment)

      // 把文档碎片重新添加会el
      this.$el.appendChild(this.$fragment)
    }
  }

  /* 实例方法 */
  /* 
    把节点转换成文档碎片的方法
    遍历解析模板的过程中，会有多次的DOM操作，会触发多次重绘与回流操作
    为了提高性能，我们进行离线处理，把节点el转换成文档碎片（fragment）
    在内存解析节点内容，不会进行重绘与回流操作，
    解析完成后，把fragment添加会原来的真实DOM中
  */
  node2fragment(node) {
    let fragment = document.createDocumentFragment()
    let child
    // 获取当前node的第一个子节点，并且把子节点添加到文档碎片中
    while ((child = node.firstChild)) {
      fragment.appendChild(child)
    }
    // 如果node中所有的子节点都添加到文档碎片中了，循环就结束了
    return fragment
  }

  /**
   * 解析文档碎步
   * @param fragment
   */
  compile(el) {
    let childNodes = el.childNodes
    // 将childNodes转换成数组进行遍历
    ;[].slice.call(childNodes).forEach(node => {
      // 如果是元素，需要解析指令
      if (this.isElementNode(node)) {
        this.compileElement(node)
      }
      // 如果是文本节点，需要解析插值
      if (this.isTextNode(node)) {
        this.compileText(node)
      }

      // 如果有孩子节点，递归解析
      if (el.childNodes && el.childNodes.length > 0) {
        this.compile(node)
      }
    })
  }

  /**
   * 解析标签节点， 主要需要解析指令
   * 1. 获取当前标签所有的属性
   * 2. 判断标签的属性是否是指令
   * 3. 如果是指令，判断是何种指令 v-text v-model v-html等等
   * @param node
   */
  compileElement(node) {
    let attrs = node.attributes
    ;[].slice.call(attrs).forEach(attr => {
      // 判断是否是指令
      if (this.isDirective(attr)) {
        let type = attr.nodeName.slice(2)
        let expr = attr.nodeValue

        if (type === "text") {
          // 解析text指令
          new Watcher(this.$vm, expr, newValue => {
            node.textContent = this.$vm[expr]
          })
          node.textContent = this.$vm[expr]
        }

        if (type === "html") {
          // 解析html指令
          new Watcher(this.$vm, expr, newValue => {
            node.innerHTML = this.$vm[expr]
          })
          node.innerHTML = this.$vm[expr]
        }

        if (type === "model") {
          // 解析model指令
          // 监听数据是否发生了改变
          // debugger
          new Watcher(this.$vm, expr, newValue => {
            node.value = newValue
          })

          node.value = this.$vm[expr]
          let vm = this.$vm
          node.addEventListener("input", function(e) {
            vm[expr] = this.value
          })
        }
        // 解析v-on指令
        if (type.startsWith("on")) {
          let eventType = type.split(":")[1]
          // 注册事件，并且解决this指向问题
          node.addEventListener(eventType, this.$vm[expr].bind(this.$vm))
        }
      }
    })
  }

  /**
   * 解析文本节点
   * @param node
   */
  compileText(node) {
    let txt = node.textContent
    let reg = /\{\{(.+)\}\}/
    // 判断是否有插值表达式
    if (reg.test(txt)) {
      let expr = RegExp.$1
      node.textContent = txt.replace(reg, this.$vm[expr])

      new Watcher(this.$vm, expr, () => {
        // 判断是否有插值表达式
        node.textContent = txt.replace(reg, this.$vm[expr])
      })
    }
  }
  /* ==========工具方法========== */
  isElementNode(node) {
    return node.nodeType === 1
  }

  isTextNode(node) {
    return node.nodeType === 3
  }

  isDirective(attr) {
    return attr.nodeName.startsWith("v-")
  }
}

/* 
  Observer: 观察者，用于监视数据变化
  Observer是将data中的数据进行处理,
  利用Object.defineProperty的get和set,从而在赋值与取值时进行劫持
  这是Vue响应式框架的基础
*/
class Observer {
  constructor(data) {
    this.data = data
    this.walk(data)
  }

  // 遍历obj对象，给对象中的每一个方法增加get和set
  walk(obj) {
    for (let k in obj) {
      this.defineReactive(obj, k, obj[k])
    }
  }

  defineReactive(obj, key, value) {
    // 每个变化的数据，都会对应一个数组，这个数组存放了所有的更新操作
    let dep = new Dep()
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // debugger
        console.log("get")
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set(newValue) {
        // debugger
        console.log("set")
        if (value === newValue) {
          return
        }
        value = newValue
        observe(newValue)
        dep.notify()
      }
    })
    observe(value)
  }
}

// 监视data数据
function observe(data) {
  if (!data || typeof data !== "object") {
    return
  }
  return new Observer(data)
}

class Dep {
  constructor() {
    // 订阅的数组
    this.subs = []
  }

  // 添加订阅
  addSub(watcher) {
    this.subs.push(watcher)
  }

  // 通知, 调用watcher的更新方法即可
  notify() {
    this.subs.forEach(watcher => {
      watcher.update()
    })
  }
}

/* 
  watcher: 观察者，观察者的目的是给需要变化的元素添加一个观察者
  当数据发生变化的时候应该调用对应的方法
*/
// 如果观察的值发生了变化，就调用cb
class Watcher {
  constructor(vm, expr, cb) {
    this.$vm = vm
    this.$expr = expr
    this.$cb = cb
    // 把当前实例存储给Dep.target
    Dep.target = this
    // 获取了 vm中的数据
    // debugger
    this.oldValue = this.$vm.$data[this.$expr]
    // 清空Dep.target, 方便下次使用
    Dep.target = null
  }

  // 对外暴漏的方法比对当前值与旧值
  update() {
    let newValue = this.$vm[this.$expr]
    let oldValue = this.oldValue
    if (newValue != oldValue) {
      // 调用db， 这里演示一下vm的watch方法
      this.$cb(newValue, oldValue)
    }
  }
}
