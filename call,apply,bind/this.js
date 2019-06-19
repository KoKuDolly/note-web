function f(){
  return this.a;
}

var g = f.bind({a:46})
console.log(g())
var h = f.bind({a:33})
console.log(h())
var i = g.bind({a:22}) // bind只在第一次绑定时生效
console.log(i())