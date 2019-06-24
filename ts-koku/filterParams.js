function typeOf (obj) {
  const toString = Object.prototype.toString;
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
  };
  return map[toString.call(obj)];
}

// deepCopy
function deepCopy (data) {
  const t = typeOf(data);
  let o;

  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i]);
    }
  }
  return o;
}

const filterParams = (param = {}, keyArr = []) => {
  let newParam = {};
  let paramCopy = deepCopy(param);
  let paramKeyArr = Object.keys(paramCopy);
  keyArr.forEach(ov => {
    paramKeyArr = paramKeyArr.filter(iv => iv !== ov);
  });
  paramKeyArr.forEach(ov => {
    newParam = Object.assign(newParam, {
      [ov]: paramCopy[ov]
    });
  });

  return newParam;
};

const myParam = {
  apicode: 333,
  extraOne: 111,
  extraTwo: 222
};
console.log(myParam, filterParams(myParam, ['extraOne', 'extraTwo']));