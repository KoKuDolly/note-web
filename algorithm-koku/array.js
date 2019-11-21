// 配置信息
const peizhi = [
  {
    key: "one",
    row: 0,
    col: 0
  },
  {
    key: "two",
    row: 0,
    col: 1
  },
  {
    key: "three",
    row: 0,
    col: 2
  },
  {
    key: "four",
    row: 1,
    col: 0
  },
  {
    key: "five",
    row: 1,
    col: 1
  },
  {
    key: "six",
    row: 1,
    col: 2
  }
];
// 二维数组
const HVArr = [
  ["one", "two", "three"],
  ["four", "five", "six"]
];
/**
 * 
 * @param {*} HVArr 
 * @description 二维数组生成配置信息
 */
function generatePeizhi(HVArr) {
    const result = []
    for(let i = 0; i < HVArr.length; i++) {
        const inner = HVArr[i]
        for (let j = 0; j < inner.length; j++) {
            result.push({
                key: inner[j],
                row: i,
                col: j
            })
        }
    }
    return result
}

const peizhi_1 = generatePeizhi(HVArr)
console.log(peizhi_1)

/**
 *
 * @param {*} peizhi
 * @description 根据配置信息，把字段放在表格结构对应处
 */

function generateHVArr(peizhi) {
  const result = []
  for (let i = 0; i < peizhi.length; i++) {
    const item = peizhi[i]
    if (!result[item["row"]]) {
      result[item["row"]] = []
    }
    result[item["row"]][item["col"]] = item["key"]
  }
  return result
}

const result = generateHVArr(peizhi)
console.log(result)

// 按照行，列生成二维数组，按行递增
/**
 *
 * @param { 第一层数组成员数 } line
 * @param { 第二层数组成员数 } lie
 * @return { 返回一个第一层数量为 line ，第二层数量为 lie 的二维数组 }
 * @description 生成垂直二维数组
 */
function generateHArr(line, lie) {
  const arr = [];
  if (line) {
    for (let i = 1; i <= line; i++) {
      const temp = [];
      for (let j = 0; j < lie; j++) {
        temp.push(j * line + i);
      }
      arr.push(temp);
    }
  }
  return arr;
}
/**
 *
 * @param { 原二维数组 } vArr
 * @param { 第一层数组成员数 } line
 * @param { 第二层数组成员数 } lie
 * @description 垂直数组 变换为 水平数组   a行b列 => b行a列     a行b列 => a行b列
 */
function v2hArrFun(vArr, line, lie) {
  let hArr = [];
  let temp = [];
  for (let j = 0; j < lie; j++) {
    temp.push(vArr.map(v => v[j]));
  }
  let flatOnelevelWholeGuizeArr = temp.reduce(function(pre, cur) {
    return pre.concat(cur);
  }, []);
  for (let i = 0; i < flatOnelevelWholeGuizeArr.length; i++) {
    if (i % lie === 0) {
      let temp = [];
      for (let j = 0; j < lie; j++) {
        temp.push(flatOnelevelWholeGuizeArr[i + j]);
      }
      hArr.push(temp);
    }
  }
  return hArr;
}
/**
 *
 * @param {*} hArr
 * @description 水平数组 转换为 垂直数组
 * @description 非结构数组，不知道行列
 */
function h2vArrFun(hArr, line, lie) {
  let vArr = [];
  let flatOnelevelWholeGuizeArr = hArr.reduce(function(pre, cur) {
    return pre.concat(cur);
  }, []);
  for (let j = 0; j < line; j++) {
    let temp = [];
    for (let i = 0; i < flatOnelevelWholeGuizeArr.length; i++) {
      if (i % line === 0) {
        temp.push(flatOnelevelWholeGuizeArr[i + j]);
      }
    }
    vArr.push(temp);
  }
  return vArr;
}

const line = 13; // 行数
const lie = 2; // 列数

const arr1 = generateHArr(line, lie);

const arr2 = v2hArrFun(arr1, line, lie);

const arr_1 = h2vArrFun(arr2, line, lie);

// console.log((arr1), '======', (arr2), '======', arr_1)

/**
 * @description 水平流动
 */

function streamH() {}

/**
 * @description 垂直流动
 */

function streamV(arr, lie) {
  const result = [];
  // arr 垂直排列的不连续二维数组
  const temp = [];
  for (let i = 0; i < lie; i++) {
    temp.push(arr.map(v => v[i]));
  }

  const arr = temp.reduce(function(pre, cur) {
    return pre.concat(cur);
  }, []);

  const line = Math.ceil(arr.length / lie);

  for (let j = 0; j < line; j++) {
    let temp = [];
    for (let i = 0; i < arr.length; i++) {
      if (i % line === 0) {
        temp.push(arr[i + j]);
      }
    }
    result.push(temp);
  }
  return result;
}

/**
 *
 * @param {*} arr2
 * @description 结构化数组，已知二维数组的行列
 */
function h2vArrFun_jiegou(arr2) {
  let arr1 = [];
  let temp_1 = [];
  temp_1 = arr2.reduce(function(pre, cur) {
    return pre.concat(cur);
  }, []);
  const line = arr2.length;
  for (let j = 0; j < line; j++) {
    let temp = [];
    for (let i = 0; i < temp_1.length; i++) {
      if (i % line === 0) {
        temp.push(temp_1[i + j]);
      }
    }
    arr1.push(temp);
  }
  return arr1;
}
