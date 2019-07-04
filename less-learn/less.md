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

## Mixins

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
