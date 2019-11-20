// 按照行，列生成二维数组，按行递增
/**
 *
 * @param { 第一层数组成员数 } line
 * @param { 第二层数组成员数 } lie
 * @return { 返回一个第一层数量为 line ，第二层数量为 lie 的二维数组 }
 */
function generateArr(line, lie) {
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
 * @param { 原二维数组 } arr1
 * @param { 第一层数组成员数 } line
 * @param { 第二层数组成员数 } lie
 * @description 垂直数组 变换为 水平数组   a行b列 => b行a列     a行b列 => a行b列
 */
function arr1toarr2(arr1, line, lie) {
  let arr2 = [];
  let tem_1 = [];
  for (let j = 0; j < lie; j++) {
    tem_1.push(arr1.map(v => v[j]));
  }
  let arr = tem_1.reduce(function(pre, cur) {
    return pre.concat(cur);
  }, []);
  for (let i = 0; i < arr.length; i++) {
    if (i % lie === 0) {
      let temp = [];
      for (let j = 0; j < lie; j++) {
        temp.push(arr[i + j]);
      }
      arr2.push(temp);
    }
  }
  return arr2;
}
/**
 *
 * @param {*} arr2
 * @description 水平数组 转换为 垂直数组
 * @description 非结构数组，不知道行列
 */
function arr2toarr1(arr2, line, lie) {
  let arr1 = [];
  let temp_1 = [];
  temp_1 = arr2.reduce(function(pre, cur) {
    return pre.concat(cur);
  }, []);
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

const line = 13; // 行数
const lie = 2; // 列数

// const arr1 = generateArr(line, lie)

// const arr2 = arr1toarr2(arr1, line, lie)

// const arr_1 = arr2toarr1(arr2, line, lie)

// console.log((arr1), '======', (arr2), arr_1)

/**
 *
 * @param {*} arr2
 * @description 结构化数组，已知二维数组的行列
 */
function arr2toarr1_jiegou(arr2) {
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

/**
 * @description 水平流动
 */

function streamH() {}

/**
 * @description 垂直流动
 */

function streamV(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i])
    }
}

const arr2 = [
  ["allmatch_days", "mail_is_reabnormal"],
  ["m1_mail_x_id_cnt", "m1_mail_x_cell_cnt"],
  ["m1_mail_x_device_cnt", "m1_linkman_cell_x_id_cnt"],
  ["m1_linkman_cell_x_cell_cnt", "m1_linkman_cell_x_tel_home_cnt"],
  ["m1_linkman_cell_x_mail_cnt", "m1_tel_home_x_cell_cnt"],
  ["m1_tel_home_x_id_cnt", "m1_home_addr_x_cell_cnt"],
  ["m1_home_addr_x_id_cnt", "m1_tel_home_x_home_addr_cnt"],
  ["m1_home_addr_x_tel_home_cnt", "m3_mail_x_id_cnt"],
  ["m3_mail_x_cell_cnt", "m3_mail_x_device_cnt"],
  ["m3_linkman_cell_x_id_cnt", "m3_linkman_cell_x_cell_cnt"],
  ["m3_linkman_cell_x_tel_home_cnt", "m3_linkman_cell_x_mail_cnt"],
  ["m3_tel_home_x_cell_cnt", "m3_tel_home_x_id_cnt"],
  ["m3_home_addr_x_cell_cnt", "m3_home_addr_x_id_cnt"],
  ["m3_tel_home_x_home_addr_cnt", "m3_home_addr_x_tel_home_cnt"],
  ["m6_mail_x_id_cnt", "m6_mail_x_cell_cnt"],
  ["m6_mail_x_device_cnt", "m6_linkman_cell_x_id_cnt"],
  ["m6_linkman_cell_x_cell_cnt", "m6_linkman_cell_x_tel_home_cnt"],
  ["m6_linkman_cell_x_mail_cnt", "m6_tel_home_x_cell_cnt"],
  ["m6_tel_home_x_id_cnt", "m6_home_addr_x_cell_cnt"],
  ["m6_home_addr_x_id_cnt", "m6_tel_home_x_home_addr_cnt"],
  ["m6_home_addr_x_tel_home_cnt", "m12_mail_x_id_cnt"],
  ["m12_mail_x_cell_cnt", "m12_mail_x_device_cnt"],
  ["m12_linkman_cell_x_id_cnt", "m12_linkman_cell_x_cell_cnt"],
  ["m12_linkman_cell_x_tel_home_cnt", "m12_linkman_cell_x_mail_cnt"],
  ["m12_tel_home_x_cell_cnt", "m12_tel_home_x_id_cnt"],
  ["m12_home_addr_x_cell_cnt", "m12_home_addr_x_id_cnt"],
  ["m12_tel_home_x_home_addr_cnt", "m12_home_addr_x_tel_home_cnt"]
];

const arr1 = arr2toarr1_jiegou(arr2);

console.log(arr1);

let arr1_source = [
  ["allmatch_days", "m3_home_addr_x_tel_home_cnt"],
  ["mail_is_reabnormal", "m6_mail_x_id_cnt"],
  ["m1_mail_x_id_cnt", "m6_mail_x_cell_cnt"],
  ["m1_mail_x_cell_cnt", "m6_mail_x_device_cnt"],
  ["m1_mail_x_device_cnt", "m6_linkman_cell_x_id_cnt"],
  ["m1_linkman_cell_x_id_cnt", "m6_linkman_cell_x_cell_cnt"],
  ["m1_linkman_cell_x_cell_cnt", "m6_linkman_cell_x_tel_home_cnt"],
  ["m1_linkman_cell_x_tel_home_cnt", "m6_linkman_cell_x_mail_cnt"],
  ["m1_linkman_cell_x_mail_cnt", "m6_tel_home_x_cell_cnt"],
  ["m1_tel_home_x_cell_cnt", "m6_tel_home_x_id_cnt"],
  ["m1_tel_home_x_id_cnt", "m6_home_addr_x_cell_cnt"],
  ["m1_home_addr_x_cell_cnt", "m6_home_addr_x_id_cnt"],
  ["m1_home_addr_x_id_cnt", "m6_tel_home_x_home_addr_cnt"],
  ["m1_tel_home_x_home_addr_cnt", "m6_home_addr_x_tel_home_cnt"],
  ["m1_home_addr_x_tel_home_cnt", "m12_mail_x_id_cnt"],
  ["m3_mail_x_id_cnt", "m12_mail_x_cell_cnt"],
  ["m3_mail_x_cell_cnt", "m12_mail_x_device_cnt"],
  ["m3_mail_x_device_cnt", "m12_linkman_cell_x_id_cnt"],
  ["m3_linkman_cell_x_id_cnt", "m12_linkman_cell_x_cell_cnt"],
  ["m3_linkman_cell_x_cell_cnt", "m12_linkman_cell_x_tel_home_cnt"],
  ["m3_linkman_cell_x_tel_home_cnt", "m12_linkman_cell_x_mail_cnt"],
  ["m3_linkman_cell_x_mail_cnt", "m12_tel_home_x_cell_cnt"],
  ["m3_tel_home_x_cell_cnt", "m12_tel_home_x_id_cnt"],
  ["m3_tel_home_x_id_cnt", "m12_home_addr_x_cell_cnt"],
  ["m3_home_addr_x_cell_cnt", "m12_home_addr_x_id_cnt"],
  ["m3_home_addr_x_id_cnt", "m12_tel_home_x_home_addr_cnt"],
  ["m3_tel_home_x_home_addr_cnt", "m12_home_addr_x_tel_home_cnt"]
];

const source = [
  { column0Title: "其他衍生变量1", column0Value: "181 天", column1Title: "" },
  { column0Title: "其他衍生变量2", column0Value: "否", column1Title: "" },
  { column0Title: "", column1Title: "其他衍生变量42", column1Value: "0 个" },
  { column0Title: "", column1Title: "其他衍生变量43", column1Value: "0 个" },
  { column0Title: "", column1Title: "其他衍生变量44", column1Value: "0 个" },
  { column0Title: "", column1Title: "其他衍生变量49", column1Value: "0 个" },
  { column0Title: "", column1Title: "其他衍生变量50", column1Value: "0 个" },
  { column0Title: "", column1Title: "其他衍生变量53", column1Value: "0 个" }
];

// [
//     { column0Title: "其他衍生变量1", column0Value: "181 天", column1Title: "其他衍生变量44", column1Value: "0 个" },
//     { column0Title: "其他衍生变量2", column0Value: "否", column1Title: "其他衍生变量49", column1Value: "0 个" },
//     { column1Title: "其他衍生变量42", column1Value: "0 个", column1Title: "其他衍生变量50", column1Value: "0 个" },
//     { column1Title: "其他衍生变量43", column1Value: "0 个", column1Title: "其他衍生变量53", column1Value: "0 个" }
// ]
streamV(source)
