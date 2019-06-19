## 语法
`fun.call(thisArg, arg1, arg2, ...)`

#### 参数
**thisArg**
在fun函数运行时指定的this值。需要注意的是，指定的this值并不一定是该函数执行时真正的this值，如果这个函数处于非严格模式下，则指定为null和undefined的this值会自动指向全局对象(浏览器中就是window对象)，同时值为原始值(数字，字符串，布尔值)的this会指向该原始值的自动包装对象。
**arg1, arg2, ...**
指定的参数列表。

#### 返回值
返回值是你调用的方法的返回值，若该方法没有返回值，则返回undefined。

#### 描述:
可以让call()中的对象调用当前对象所拥有的function。你可以使用call()来实现继承：写一个方法，然后让另外一个新的对象来继承它（而不是在新对象中再写一次这个方法）。

#### 示例:
##### 使用call方法调用父构造函数
- 在一个子构造函数中，你可以通过调用父构造函数的call方法来实现继承，类似于Java中的写法。下例中，使用Food和Toy构造函数创建的对象实例都会拥有在Product构造函数中添加的name属性和price属性,但category属性是在各自的构造函数中定义的。

```
  function Product(name, price) {
    this.name = name;
    this.price = price;
    console.log(111)
    if (price < 0) {
      throw RangeError(
        'Cannot create product ' + this.name + ' with a negative price'
      );
    }
  }
  // console.log(Product.call())

  function Food(name, price) {
    Product.call(this, name, price); // 这里this指向Food实例对象,通过调用Product的call方法,继承了Product的所有方法,这时候Product里的this就是现在call的第一个参数this
    this.category = 'food'; // 在这里为Food添加新的属性
  }

  //等同于
  // function Food(name, price) {
  //   this.name = name;
  //   this.price = price;
  //   if (price < 0) {
  //     throw RangeError(
  //       'Cannot create product ' + this.name + ' with a negative price'
  //     );
  //   }

  //   this.category = 'food';
  // }

  //function Toy 同上
  function Toy(name, price) {
    Product.call(this, name, price);
    this.category = 'toy';
  }

  // var cheese = new Food('feta', 5); // new () 的时候,函数就调用了,返回的是一个实例对象
  // var fun = new Toy('robot', 40);

  // console.log(cheese, fun)
  // console.log(new Food('feta', 5))
```

##### 使用call方法调用匿名函数
- 在下例中的for循环体内，我们创建了一个匿名函数，然后通过调用该函数的call方法，将每个数组元素作为指定的this值执行了那个匿名函数。这个匿名函数的主要目的是给每个数组元素对象添加一个print方法，这个print方法可以打印出各元素在数组中的正确索引号。当然，这里不是必须得让数组元素作为this值传入那个匿名函数（普通参数就可以），目的是为了演示call的用法。

```
  var animals = [
    {species: 'Lion', name: 'King'},
    {species: 'Whale', name: 'Fail'}
  ];

  for (var i = 0; i < animals.length; i++) {
    (function (i) {
      this.print = function () { 
        console.log('#' + i  + ' ' + this.species + ': ' + this.name); // 这里的this就是该函数call方法传入的第一个参数指定的哪个值
      } 
      this.print();
    }).call(animals[i], i);
  }

  // 普通传参调用匿名函数
  var animals = [
    {species: 'Lion', name: 'King'},
    {species: 'Whale', name: 'Fail'}
  ];

  for (var i = 0; i < animals.length; i++) {
    (function (a, i) { 
      this.print = function () { 
        console.log('#' + i  + ' ' + a.species + ': ' + a.name); 
      } 
      this.print();
    })(animals[i], i);
  }
```

##### 使用call方法调用函数并且指定上下文的'this'
- 在下面的例子中，当调用greet方法的时候，该方法的this值会绑定到i对象。
```
  function greet() {
    var reply = [this.person, 'Is An Awesome', this.role].join(' ');
    console.log(reply);
  }

  var i = {
    person: 'Douglas Crockford', role: 'Javascript Developer'
  };

  greet.call(i); // Douglas Crockford Is An Awesome Javascript Developer
```