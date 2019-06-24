let str = '基本知识、基础理论所占比例：  1  %知识运用能力的测验所占比例： 2   %参考资料、课外阅读内容所占比例： 3   %'

const pattern = /：\s*([^%]+\S)\s*%/;
let result = pattern.exec(str);
let arr = []
while((result = pattern.exec(str))){
  arr.push(result[1]);
  str = str.replace(result[0], 'aa'); // 'aa' 是随便些的，只要替换掉原str，防止死循环
}

console.log(arr.join(''), str)