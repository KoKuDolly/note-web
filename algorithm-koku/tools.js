
// 检测浏览器是pc还是mobile
// function browserRedirect() {
//   var sUserAgent= navigator.userAgent.toLowerCase(),
//     bIsIpad= sUserAgent.match(/ipad/i) == "ipad",
//     bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os",
//     bIsMidp= sUserAgent.match(/midp/i) == "midp",
//     bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
//     bIsUc= sUserAgent.match(/ucweb/i) == "ucweb",
//     bIsAndroid= sUserAgent.match(/android/i) == "android",
//     bIsCE= sUserAgent.match(/windows ce/i) == "windows ce",
//     bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile";
//   if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
//     location.href = "http://www.baironginc.com/car_h5/index.html";
//     // toH5();
//   }
// }

// 排序tab页
export function sortMap (arrOrder = [], arr) {
  let newArr = []
  let tranArr = []

  tranArr = arrOrder.filter((ov, oi) => {
    return arr.includes(ov.value)
  })

  tranArr = tranArr.sort((a, b) => {
    const n0 = a.index
    const n1 = b.index
    if (n0 < n1) {
      return -1
    }
    if (n0 > n1) {
      return 1
    }
    return 0
  })
  newArr = tranArr.map((v) => {
    return v.value
  })
  return newArr
}

export const regex = {
  username: /^[a-zA-z]\w{3,15}$/,
  pwd: / ^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/, // 字母+数字，字母+特殊字符，数字+特殊字符
  pwd2: /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/, // 字母+数字+特殊字符
  pwd3: /^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/, // 纯数字，纯字母，纯特殊字符
  phone: /^0?1[3|4|5|6|7|8][0-9]\d{8}$/,
  phone_2: /^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/,
  email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
  code: /^\d{4}$/,
  tel: /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/,
  qq: /^[1-9]\d{4,9}$/,
  url: /\bhttp/,
  isIDCard: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
}

export function isnotempty (data) {
  if (data != null && data !== '' && typeof (data) !== 'undefined' && data !== 'undefined' && data !== 'nil') {
    return true
  }
}

export function isempty (data) {
  if (data === null || data === '' || typeof (data) === 'undefined' || data === 'undefined' || data === 'nil') {
    return true
  }
}

// 获取Url参数
export function getUrlParams (name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
  let r = window.location.search.substr(1).match(reg) // 匹配目标参数
  if (r != null) {
    return unescape(r[2]) // 返回参数值
  } else {
    return null
  }
}

// 校验-支持中文、字母、数字以及部分字符“@”“_”"-"
export function isName (s) {
  let re = /^[\u4e00-\u9fa50-9a-zA-Z@_-]{0,20}$/
  return re.exec(s)
}

/**
 * 来自吴忠
 */
export const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]'
export const isArray = arr => Array.isArray(arr)

export const emptyObj = (obj) => { // json 判断属性
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false
    }
  }
  return true
}

export const deepCopy = (o) => {
  if (o instanceof Array) {
    const n = []
    for (let i = 0; i < o.length; ++i) {
      n[i] = deepCopy(o[i])
    }
    return n
  } else if (o instanceof Object) {
    const n = {}
    let i
    for (i in o) {
      n[i] = deepCopy(o[i])
    }
    return n
  } else {
    return o
  }
}

const deepCopyFun = (o) => {
  if (o instanceof Array) {
    const n = []
    for (let i = 0; i < o.length; ++i) {
      n[i] = deepCopyFun(o[i])
    }
    return n
  } else if (typeof o === 'function') {
    return o
  } else if (o instanceof Object) {
    const n = {}
    let i
    for (i in o) {
      n[i] = deepCopyFun(o[i])
    }
    return n
  } else {
    return o
  }
}

/**
 * @public
 * @name formatDate
 * @param {date}
 * @param {string} rule 格式
 * @return {string}
 * @description 时间格式化
 */

export const formatDate = (date, rule = 'YYYY-MM-DD') => {
  if (!date) return
  if (typeof date === 'string') {
    date = date.trim()
  }
  var text = moment(date).format(rule)
  return text === 'Invalid date' ? date : text
}

/**
 * @public
 * @name filterData
 * @param {obj, array} data
 * @param {fun} fun 过滤规则，需要去除的数据, 返回 boolean
 * @return {obj, array}
 * @description 数据过滤
 */

export const filterData = (data = [], fun) => {
  let result = null
  if (isArray(data)) {
    result = data.filter(item => fun(item))
  } else if (isObject(data)) {
    const keysArr = Object.keys(data)
    const keysFilter = keysArr.filter(key => fun(data[key]))

    result = {}
    for (let key of keysFilter) {
      result[key] = data[key]
    }
  } else {
    return new Error('data is object or array !')
  }

  return result
}

/**
 * @public
 * @name download
 * @param {string} url
 * @param {string} filename
 * @description 模拟下载
 */

export const download = (url = '', filename = 'file') => {
  let a = document.createElement('a')
  a.href = url.replace(/\/\//g, '/')
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
}

/**
 * @export
 * @param {any} JSONstr
 * @returns
 */
export function preventJSONParse (JSONstr, initVal = {}) {
  return new Promise((resolve, reject) => {
    if (!JSONstr) {
      resolve(initVal)
    } else {
      const JSON_DATA = JSON.parse(JSONstr)
      resolve(JSON_DATA)
    }
  })
}
/**
 * @param {any} obj
 * @param {any} props
 * @param {string} [defaultValue='']
 * @returns
 */
export function getObjKeyValByPath (obj, props, defaultValue = '-') {
  if (typeof props === 'string') {
    props = props.split('.')
  }

  if (typeof obj === 'undefined' || (!obj && typeof obj !== 'undefined' && obj !== 0)) {
    return defaultValue
  }
  if (props.length === 0) {
    return obj
  }

  var prop = props.shift()

  if (prop && obj.hasOwnProperty(prop)) {
    return getObjKeyValByPath(obj[prop], props, defaultValue)
  }

  return defaultValue
}

/**
 * @param {*} jsonStr
 * @returns
 */
export function formatJson (jsonStr) {
  function repeat (s, count) {
    return new Array(count + 1).join(s)
  }
  var json = jsonStr

  var i = 0
  var len = 0
  var tab = '    '
  var targetJson = ''
  var indentLevel = 0
  var inString = false
  var currentChar = null

  for (i = 0, len = json.length; i < len; i += 1) {
    currentChar = json.charAt(i)

    switch (currentChar) {
      case '{':
      case '[':
        if (!inString) {
          targetJson += currentChar + '\n' + repeat(tab, indentLevel + 1)
          indentLevel += 1
        } else {
          targetJson += currentChar
        }
        break
      case '}':
      case ']':
        if (!inString) {
          indentLevel -= 1
          targetJson += '\n' + repeat(tab, indentLevel) + currentChar
        } else {
          targetJson += currentChar
        }
        break
      case ',':
        if (!inString) {
          targetJson += ',\n' + repeat(tab, indentLevel)
        } else {
          targetJson += currentChar
        }
        break
      case ':':
        if (!inString) {
          targetJson += ': '
        } else {
          targetJson += currentChar
        }
        break
      case ' ':
      case '\n':
      case '\t':
        if (inString) {
          targetJson += currentChar
        }
        break
      case '"':
        if (i > 0 && json.charAt(i - 1) !== '\\') {
          inString = !inString
        }
        targetJson += currentChar
        break
      default:
        targetJson += currentChar
        break
    }
  }
  return targetJson
}

export const TEL_REG = /^(13[0-9]|(14[0,1,4-9])|15[0-9]|(16[5,6])|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$|^[a-zA-Z0-9]{32}$|^[a-zA-Z0-9]{64}$/
export const NAME_REG = /^[\u4E00-\u9FA5]{2,10}(?:·[\u4E00-\u9FA5]{2,10})*$/
export const ID_REG = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[01])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[01])((\d{4})|\d{3}[X])$)$|^([a-zA-Z0-9]{32})$|^[a-zA-Z0-9]{64}$/

/**
 * 来自 iview-admin
 */

export function typeOf (obj) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return map[toString.call(obj)]
}

/**
 * 来自 自己
 */

/**
 * @public
 * @name filterParams
 * @param {object} param
 * @param {array} keyArr
 * @returns {object}
 * @description 过滤对象中不要的参数，并不会修改原对象
 * @author jiajun.qin
 */
export const filterParams = (param = {}, keyArr = []) => {
  let newParam = {}
  let paramCopy = deepCopy(param)
  let paramKeyArr = Object.keys(paramCopy)
  keyArr.forEach(ov => {
    paramKeyArr = paramKeyArr.filter(iv => iv !== ov)
  })
  paramKeyArr.forEach(ov => {
    newParam = Object.assign(newParam, {
      [ov]: paramCopy[ov]
    })
  })
  return newParam
}
