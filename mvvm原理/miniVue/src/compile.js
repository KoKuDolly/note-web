/* 
  专门负责解析模板内容
*/
class Compile {
  constructor(el, vm) {
    // el: new vue传递的选择器
    this.el = typeof el === "string" ? document.querySelector(el) : el
    // vm: new的vue实例
    this.vm = vm

    // 编译模板
    if (this.el) {
      //1. 把el中所有的子节点都放入到内存中， fragment
      let fragment = this.node2fragment(this.el)
      //2. 在内存中编译fragment
      this.compile(fragment)
      //3. 把fragment一次性的添加到页面
      this.el.appendChild(fragment)
    }
  }

  /* 核心方法 */
  node2fragment(node) {
    let fragment = document.createDocumentFragment()
    // 把el中所有的子节点挨个添加到文档碎片中
    let childNodes = node.childNodes
    this.toArray(childNodes).forEach(node => {
      // 把所有的子节点都添加到frament中
      fragment.appendChild(node)
    })
    return fragment
  }

  /**
   * 编译文档碎片（内存中）
   * @param {*} fragment
   */
  compile(fragment) {
    let childNodes = fragment.childNodes
    this.toArray(childNodes).forEach(node => {
      // 编译子节点

      if (this.isElementNode(node)) {
        // 如果是元素， 需要解析指令
        this.compileElement(node)
      }

      if (this.isTextNode(node)) {
        // 如果是文本节点， 需要解析插值表达式
        this.compileText(node)
      }

      // 如果当前节点还有子节点，需要递归的解析
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node)
      }
    })
  }

  // 解析html标签
  compileElement(node) {
    // console.log(node)
    // 1. 获取到当前节点下所有的属性
    let attributes = node.attributes
    this.toArray(attributes).forEach(attr => {
      // 2. 解析vue的指令（所以以v-开头的属性）
      let attrName = attr.name

      if (this.isDirective(attrName)) {
        let type = attrName.slice(2)
        let expr = attr.value

        // console.log(type)
        // 解析v-on指令
        if (this.isEventDirective(type)) {
          CompileUtil["eventHandler"](node, this.vm, type, expr)
        } else {
          CompileUtil[type] && CompileUtil[type](node, this.vm, expr)
        }
      }
    })
  }

  // 解析文本节点
  compileText(node) {
    CompileUtil.mustache(node, this.vm)
  }

  /* 工具方法 */
  toArray(likeArray) {
    return [].slice.call(likeArray)
  }
  isElementNode(node) {
    //nodeType: 节点的类型  1：元素节点  3：文本节点
    return node.nodeType === 1
  }
  isTextNode(node) {
    return node.nodeType === 3
  }
  isDirective(attrName) {
    return attrName.startsWith("v-")
  }
  isEventDirective(type) {
    return type.split(":")[0] === "on"
  }
}

let CompileUtil = {
  mustache(node, vm) {
    let txt = node.textContent
    let reg = /\{\{(.+)\}\}/
    if (reg.test(txt)) {
      let expr = RegExp.$1
      // debugger
      node.textContent = txt.replace(reg, this.getVMValue(vm, expr))

      new Watcher(vm, expr, newValue => {
        node.textContent = txt.replace(reg, newValue)
      })
    }
  },
  // 处理v-text指令
  text(node, vm, expr) {
    node.textContent = this.getVMValue(vm, expr)
    // 通过watcher对象，监听expr的数据的变化，一旦变化了，执行回调函数
    new Watcher(vm, expr, (newValue, oldValue) => {
      node.textContent = newValue
    })
  },
  html(node, vm, expr) {
    node.innerHTML = this.getVMValue(vm, expr)
    new Watcher(vm, expr, newValue => {
      node.innerHTML = newValue
    })
  },
  model(node, vm, expr) {
    let self = this
    node.value = this.getVMValue(vm, expr)
    // 实现双向的数据绑定， 给node注册input事件，当当前元素的value值发生改变，修改对应的数据
    node.addEventListener("input", function() {
      self.setVMValue(vm, expr, this.value)
    })
    new Watcher(vm, expr, newValue => {
      node.value = newValue
    })
  },
  eventHandler(node, vm, type, expr) {
    // 给当前元素注册事件即可
    let eventType = type.split(":")[1]
    let fn = vm.$methods && vm.$methods[expr]
    if (eventType && fn) {
      node.addEventListener(eventType, fn.bind(vm))
    }
  },
  // 这个方法用于获取VM中的数据
  getVMValue(vm, expr) {
    // 获取到data中的数据
    let data = vm.$data
    expr.split(".").forEach(key => {
      data = data[key]
    })
    return data
  },
  setVMValue(vm, expr, value) {
    let data = vm.$data
    // car brand
    let arr = expr.split(".")

    arr.forEach((key, index) => {
      // 如果index是最后一个
      if (index < arr.length - 1) {
        data = data[key]
      } else {
        data[key] = value
      }
    })
  }
}
