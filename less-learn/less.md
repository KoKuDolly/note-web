# less

## Variables

### Lazy Evaluation

变量在使用前不必声明。

## Parent Selectors

## Extend

extend是一个less伪类，它将所使用的选择器与匹配它引用的选择器合并在一起。

### 语法

> 不论是挨着选择器还是放在规则集里面都行。它看起来像是个伪类，参数选择器可以跟一个可选的关键字`all`。

```less
.a:extend(.b) {}

// the above block does the same thing as the below block
.a {
  &:extend(.b);
}
.c:extend(.d all) {
  // extends all instances of ".d" e.g. ".x.d" or ".d.x"
}
.c:extend(.d) {
  // extends only instances where the selector will be output as just ".d"
}
.e:extend(.f) {}
.e:extend(.g) {}

// the above and the below do the same thing
.e:extend(.f, .g) {}
```

### Extend Attached to Selector

```less
  pre:hover:extend(div pre);

  pre:hover :extend(div pre);

  pre:hover:extend(div pre):extend(.bucket tr)
  // <=>
  pre:hover:extend(div pre, .bucket tr)

  pre:hover:extend(div pre).nth-child(odd) // This is NOT allowed, Extend must be last.
```

### Extend Inside Ruleset

```less
pre:hover,
.some-class {
  &:extend(div pre);
}
// <=>
pre:hover:extend(div pre),
.some-class:extend(div pre) {}
```

### Extending Nested Selectors

### Exact Matching with Extend

> nth Expression

### Extend "all"

```less
.a.b.test,
.test.c {
  color: orange;
}
.test {
  &:hover {
    color: green;
  }
}

.replacement:extend(.test all) {}
// Outputs
.a.b.test,
.test.c,
.a.b.replacement,
.replacement.c {
  color: orange;
}
.test:hover,
.replacement:hover {
  color: green;
}
```

### Selector Interpolation with Extend

### Scoping / Extend Inside @media

### Duplication Detection

### Use Cases for Extend

#### Classic Use Case

#### Reducing CSS Size

#### Combining Styles / A More Advanced Mixin

## Merge

为了避免任何无意的联接，合并要求在每个联接挂起声明上都有一个显式的`+`或`+_`标志。

### Comma

```less
.mixin() {
  box-shadow+: inset 0 0 10px #555;
}
.myclass {
  .mixin();
  box-shadow+: 0 0 20px black;
}
// Outputs
.myclass {
  box-shadow: inset 0 0 10px #555, 0 0 20px black;
}
```

### Space

```less
.mixin() {
  transform+_: scale(2);
}
.myclass {
  .mixin();
  transform+_: rotate(15deg);
}
// Outputs
.myclass {
  transform: scale(2) rotate(15deg);
}
```

## Mixins

当前和历史上，mixin调用中的括号都是可选的，但可选括号已被弃用，在将来的版本中将需要使用。

### Not Outputting the Mixin

如果您希望创建一个mixin，但不希望该mixin出现在CSS输出中，请在mixin定义后面加上括号。

```less
.my-mixin {
  color: black;
}
.my-other-mixin() {
  background: white;
}
.class {
  .my-mixin();
  .my-other-mixin();
}
// outputs
.my-mixin {
  color: black;
}
.class {
  color: black;
  background: white;
}
```

### Selectors in Mixins

### Namespaces

### Guarded Namespaces

### The `!important` keyword

### Parametric Mixins

#### How to pass arguments to mixins

#### Mixins with Multiple Parameters

> **定义多个具有相同名字和不同数量的参数的mixins是合法的。**

```less
.mixin(@color) {
  color-1: @color;
}
.mixin(@color; @padding: 2) {
  color-2: @color;
  padding-2: @padding;
}
.mixin(@color; @padding; @margin: 2) {
  color-3: @color;
  padding-3: @padding;
  margin: @margin @margin @margin @margin;
}
.some .selector div {
  .mixin(#008000);
}

// compiles into:
.class1 {
  color: #33acfe;
  margin: 20px;
  padding: 20px;
}
.class2 {
  color: #efca44;
  margin: 10px;
  padding: 40px;
}
```

#### Named Parameters

#### The `@arguments` Variable

#### Advanced Arguments and the `@rest` Variable

### Pattern-matching

### Using Mixins as Functions

> 使用中括号寻找mixins中的指定属性，传 `[]` 意味着获取mixins中最后的属性值

#### Property / value accessors

#### Overriding mixin values

#### Unnamed lookups

#### Unlocking mixins & variables into caller scope

### Recursive Mixins

### Mixin Guards

#### Guard Comparison Operators

#### Guard Logical Operators

#### Type Checking Functions

### Aliasing Mixins

#### Assigning mixin calls to a variable

#### Variable calls

## CSS Guards

## Detached Rulesets

## Nesting

### Nested At-Rules and Bubbling

```less
.component {
  width: 300px;
  @media (min-width: 768px) {
    width: 600px;
    @media  (min-resolution: 192dpi) {
      background-image: url(/img/retina2x.png);
    }
  }
  @media (min-width: 1280px) {
    width: 800px;
  }
}
```

```css
.component {
  width: 300px;
}
@media (min-width: 768px) {
  .component {
    width: 600px;
  }
}
@media (min-width: 768px) and (min-resolution: 192dpi) {
  .component {
    background-image: url(/img/retina2x.png);
  }
}
@media (min-width: 1280px) {
  .component {
    width: 800px;
  }
}
```

## Operations

## Escaping

在3.5+中，许多以前需要“引号转义”的情况是不需要的。

less<3.5

```less
@min768: ~"(min-width: 768px)";
.element {
  @media @min768 {
    font-size: 1.2rem;
  }
}
```

less\>3.5

```less
@min768: (min-width: 768px);
.element {
  @media @min768 {
    font-size: 1.2rem;
  }
}
```

```css
@media (min-width: 768px) {
  .element {
    font-size: 1.2rem;
  }
}
```

## Functions

## Namespaces and Accessors

## Maps

```less
#colors() {
  primary: blue;
  secondary: green;
}

.button {
  color: #colors[primary];
  border: 1px solid #colors[secondary];
}
```

```css
.button {
  color: blue;
  border: 1px solid green;
}
```

## Scope

less中的作用域与css中的作用域非常相似。首先在本地查找变量和混合函数，如果找不到它们，则从“父”范围继承。

```less
@var: red;

#page {
  @var: white;
  #header {
    color: @var; // white
  }
}
```

与CSS自定义属性一样，mixin和变量定义不必放在引用它们的行之前。因此下面的代码与前面的示例相同：

```less
@var: red;

#page {
  #header {
    color: @var; // white
  }
  @var: white;
}
```

[less](http://lesscss.org/)
