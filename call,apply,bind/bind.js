function LateBloomer() {
  this.petalCount = Math.ceil(Math.random() * 12) + 1
}

// Declare bloom after a delay of 1 second
LateBloomer.prototype.bloom = function() {
  setTimeout(this.declare.bind(this), 1000)
  // this.declare()
}

LateBloomer.prototype.declare = function() {
  console.log('I am a beautiful flower with ' +
    this.petalCount + ' petals!')
}

var flower = new LateBloomer()
// while (true) {
//   flower.bloom()  // 一秒钟后, 调用'declare'方法
// }
// flower.bloom()
// n=0
// while(n<10){
//   flower.bloom()
//   n++
// }

// while(true){
//   flower.bloom()
// }

// while(true){
//   setTimeout(flower.declare, 1000)
// }

// 先开启了无数个循环,等待循环结束才会执行settimeout的东西,settimeout里的内容会放到队列末尾执行
// n=0
// while(n<1000){
//   setTimeout(flower.declare, 1000)
//   n++
// }

// 开启一个循环就执行一次,然后再次开启循环
while (false) {
  flower.declare()
}
