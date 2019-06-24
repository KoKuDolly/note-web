interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

// let square: Square = {
//     color: "blue",
//     sideLength: 10
// };

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;