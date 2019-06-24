interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

// let square = <Square>{}; // 类型断言
let square = {} as Square;
square.color = "blue";
square.sideLength = 10;