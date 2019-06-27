# variable-fonts

1. 字体变量的使用，需要字体文件的支持，测试了下，微软雅黑不支持。（你所使用的任何Web字体需要支持这些特性。）

2. contenteditable 元素是否可编辑属性

```css
@font-face {
  font-family: 'Amstelvar VF';
  src: url('fonts/AmstelvarAlpha-VF.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-stretch: 75% 100%;
  /* 用两个值表示，规定该字体的该属性支持的可选范围 */
  font-style: normal;
  font-display: swap;
  
}

html {
  box-sizing: border-box;
  font-size: 100%;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  font: 1.2em "Amstelvar VF", Georgia, serif;
  margin: 20px;
  padding: 0;
}

.wrapper {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
}

@media screen and (min-width: 42rem) {
  .wrapper {
    grid-template-columns: 1fr 1fr;
  }
}

textarea {
  font-family: monospace;
  display: block;
  margin-bottom: 10px;
  height: 160px;
  background-color: #F4F7F8;
  border: none;
  border-left: 6px solid #558ABB;
  color: #4D4E53;
  padding: 1rem 0;
  width: 100%;
}

textarea:nth-of-type(1) {
  height: 130px;
}

textarea:nth-of-type(2) {
  height: 100px;
}

.container2 * {
  font-size: 64px;
  font-variation-settings: 'GRAD'/* 变化轴 */ var(--text-axis);
  /* font-variation-settings 较低级的语法，只用来设置轴的值；尽可能使用相应属性 */
  /* 注册轴必须小写，自定义轴必须大写。使用 font-variation-settings 来设置轴的值的时候，轴名字是区分大小写的。*/
}
```
