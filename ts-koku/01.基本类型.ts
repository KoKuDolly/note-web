enum Color { red = 1, green = 's', blue = 'a'}
let colorName: string = Color['s'];
console.log(colorName);

// 想要这样的
// var Color;
// (function (Color) {
//     Color[Color["red"] = 1] = "red";
//     Color[Color["green"] = "s"] = "green";
//     Color[Color["blue"] = "a"] = "blue";
// })(Color || (Color = {}));

// var colorName = Color['s'];
// console.log(colorName);

// 结果是这样的
// var Color;
// (function (Color) {
//     Color[Color["red"] = 1] = "red";
//     Color["green"] = "s";
//     Color["blue"] = "a";
// })(Color || (Color = {}));
// var colorName = Color['s'];
// console.log(colorName);

