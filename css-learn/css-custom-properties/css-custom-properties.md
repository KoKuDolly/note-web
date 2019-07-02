# css-custom-properties

## 概念

>自定义属性（有时称为CSS变量或级联变量）是由CSS作者定义的实体，包含要在整个文档中重用的特定值。 它们使用自定义属性表示法（例如， --main-color：black;）进行设置，并使用var（）函数进行访问（例如，color：var（ --main-color）;）。
>
>自定义属性受级联影响，并从父级继承其值。

## 自定义属性的继承

>自定义属性确实继承。 这意味着如果没有为给定元素的自定义属性设置值，则使用其父元素的值。
>
>请记住，这些是自定义属性，而不是您可能在其他编程语言中找到的实际变量。 该值在需要时计算，不存储以用于其他规则。 例如，您不能为元素设置属性，并期望在兄弟的后代规则中检索它。 该属性仅为匹配选择器及其后代设置，就像任何普通的CSS一样。

## 自定义属性的回退值

>使用`var()`函数，可以定义多个回退值座位给定变量未定义时的备用值；在自定义元素（custom elements）和阴影dom（shadow DOM）中比较有用。
>
>回退值不是用来解决浏览器兼容性的。如果浏览器不支持css自定义变量，那么回退值将没有作用。回退值只是支持css自定义变量浏览器在使用css变量时给定的变量值未定义或者无效时作为一个备用值。

```css
.two {
  color: var(--my-var, red); /* Red if --my-var is not defined */
}

.three {
  background-color: var(--my-var, var(--my-background, pink)); /* pink if my-var and --my-background are not defined 有性能问题*/
}

.three {
  background-color: var(--my-var, --my-background, pink); /* Invalid: "--my-background, pink" */
}

.four {
  var(--foo, red, blue); /* 可以的，red，blue 将作为 --foo 的备用值 */
}
```

## 值的有效性

>绑定到每个属性的经典CSS有效性概念在自定义属性方面不太有用。当解析自定义属性的值时，浏览器不知道它们将在何处使用，因此必须将几乎所有的值都视为有效值。
>
>不幸的是，这些有效的值可以通过var（）函数表示法在一个可能没有意义的上下文中使用。属性和自定义变量可能导致无效的css语句，从而导致在计算时间有效的新概念。

## 当使用无效值会发生什么

>当浏览器遇到无效的var（）替换时，将使用属性的初始值或继承值。
>
>当css语法错误时，这行会被忽略。当使用级联值或使用自定义属性值是无效值时，不会忽略这行，从而导致值被设置为继承值或者默认值。

## js 中的值

```js
// get variable from inline style
element.style.getPropertyValue("--my-var");

// get variable from wherever
getComputedStyle(element).getPropertyValue("--my-var");

// set variable on inline style
element.style.setProperty("--my-var", jsVar + 4);
```

## [MDN链接](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
