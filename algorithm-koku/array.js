// 表格配置信息
const peizhi = [
  {
    key: "one",
    row: 0,
    col: 0,
    colTitle: '列1',
    rowTitle: '行1'
  },
  {
    key: "two",
    row: 0,
    col: 1,
    colTitle: '列2',
    rowTitle: '行1'
  },
  {
    key: "three",
    row: 0,
    col: 2,
    colTitle: '列3',
    rowTitle: '行1'
  },
  {
    key: "four",
    row: 1,
    col: 0,
    colTitle: '列1',
    rowTitle: '行2'
  },
  {
    key: "five",
    row: 1,
    col: 1,
    colTitle: '列2',
    rowTitle: '行2'
  },
  {
    key: "six",
    row: 1,
    col: 2,
    colTitle: '列3',
    rowTitle: '行2'
  }
];
// 二维数组
const HVArr = [
  ["one", "two", "three"],
  ["four", "five", "six"]
];
// 表格数据
const backData = {
  one: {
    name: 'one',
    value: '1-1'
  },
  two: {
    name: 'two',
    value: '1-2'
  },
  three: {
    name: 'three',
    value: '1-3'
  },
  four: {
    name: 'four',
    value: '2-1'
  },
  five: {
    name: 'five',
    value: '2-2'
  },
  six: {
    name: 'six',
    value: '2-3'
  }
}
/**
 * @param {title}
 * @param {key}
 * @param {children}
 * @param {render}
 * @param {colNum}
 * @param {HVArr} 二维数组
 * @description 业务平台 根据字段配置信息生成colomns
 * @description 应该由 配置平台 直接返回相应表格的colomns的数据 还是 业务平台 代码生成呢
 */
function generateColumns(peizhi) {
  let result = []
  console.log(peizhi)

  const columns = [
    {
      title: '',
      children: [
        {
          title: '',
          key: ''
        },
        {
          title: '',
          render: () => {}
        }
      ]
    }
  ]
  // let colTitles = peizhi.map((v) => {
  //   return v.colTitle
  // })
  // let rowTitles = peizhi.map((v) => {
  //   return v.rowTitle
  // })
  // colTitles = [...new Set(colTitles)]
  // rowTitles = [...new Set(rowTitles)]
  // console.log(colTitles, rowTitles)
  result = peizhi.map(v => {
    return {
      key: v.key,
      title: v.colTitle
    }
  })
  console.log(result)
  return result
}

generateColumns(peizhi)

function generateTableData(backData) {
  return [
    {
      one: '',
      two: '',
      three: '',
      four: ''
    }
  ]
}
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

// const peizhi_1 = generatePeizhi(HVArr)
// console.log(peizhi_1)

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

// const result = generateHVArr(peizhi)
// console.log(result)

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
