var strTpl = '我的名字是:name% %，我的女神是:goddess%';

var obj = {
  'name': '王磊',
  goddess: '小姐姐'
};

function template(templateStr, data) {
  const reg = /\:\s*([^%]+\S)\s*%/;
  let str = templateStr;
  let result = reg.exec(str);
  console.log(result)
  while ((result = reg.exec(str))) {
    
    const resultStr = result[0];
    const resultWord = result[1];
    str = str.replace(resultStr, data[resultWord]);
  }
  return str;
}

console.log(template(strTpl, obj));


