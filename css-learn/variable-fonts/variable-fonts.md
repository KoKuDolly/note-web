# variable-fonts

## 概念

> 可变字体是OpenType字体规范的演变，它允许将字体的许多不同变体合并到单个文件中，而不是为每个宽度，重量或样式分别使用单独的字体文件。 它们允许您通过CSS和单个@ font-face引用访问给定字体文件中包含的所有变体。

1. 字体变量的使用，需要字体文件的支持，测试了下，微软雅黑不支持。（你所使用的任何Web字体需要支持这些特性。）

2. contenteditable 元素是否可编辑属性

## variation axis

### 注册轴

小写的四个字符，有五个，分别是 weight, width, slant, italic, and optical size => 'wght', 'wdth', 'ital', 'slnt', 'opsz'

### 自定义轴

四个大写字符组成，无限个

### 注册轴与已存在的css属性

1. font-variation-settings 使用这个规定轴属性值的时候，是区分大小写的，注册轴小写，自定义轴大写，都是四个字符。
2. 使用 `font-variation-settings` 设置了许多值后，要想改变这些值，必须重新全部重新申明这些值（`font-feature-settings` 也是类似）。但你可以使用 `css variables` 来改变指定的值，而不用全部重新申明。

## 注册轴详细解释

### weight => 'wght'

```css
font-weight: 375;

font-variation-settings: 'wght' 375;
```

### width => 'wdth'

```css
font-stretch: 115%;

font-variation-settings: 'wdth' 115;
```

### italic => 'ital'

在CSS中，使用font-style属性将斜体和斜体都应用于文本。 还要注意font-synthesis的引入：none;  - 这会阻止浏览器意外地应用变异轴和合成斜体。 这可以用来防止虚假加粗。

```css
font-style: italic;

font-variation-settings: 'ital' 1;

font-synthesis: none;
```

### slant => 'slnt'

Slant（由slnt标签表示），或者它经常被称为“倾斜” - 与真正的斜体不同之处在于它改变了字体的角度但不执行任何类型的字符替换。 它也是可变的，因为它表示为数值范围。 这允许字体沿该轴的任何位置变化。 允许的范围通常为0（直立）到20度 - 可以提供该范围内的任何数值，因此字体可以倾斜一点点。 但是，-90-90度的任何值都是有效的。

```css
font-style: oblique 14deg;

font-variation-settings: 'slnt' 14;
```

### optical size => 'opsz'

光学尺寸值通常旨在根据字体大小自动应用，但也可以使用较低级别的font-variation-settings语法进行操作。

有一个新属性，font-optical-sizing，用于支持CSS中的可变字体。 使用font-optical-sizing时，唯一允许的值是auto或none  - 因此该属性仅允许打开或关闭光学大小。 但是，当使用font-variation-settings：'opsz'\<num>时，您可以提供数值。 在大多数情况下，您可能希望将字体大小（正在渲染的类型的物理大小）与opsz值（使用auto时应用光学大小的方式）进行匹配。 提供了提供特定值的选项，以便有必要覆盖默认值 - 为了易读性，美观或其他原因 - 可以应用特定值。

```css
font-optical-sizing: auto;

font-variation-settings: 'opsz' 36;
```

## 自定义轴详细解释

### grade

等级可能成为更常见的自定义轴之一，因为它在字体设计中具有已知的历史。 设计不同等级的字体的做法通常是对预期用途和印刷技术的反应。 术语“等级”是指字体设计的相对重量或密度，但与传统的“重量”不同之处在于文本占据的物理空间不会改变，因此改变文本等级不会改变文本等级的整体布局。 文本或其周围的元素。 这使得等级成为有用的变化轴，因为它可以变化或动画而不会引起文本本身的回流

```css
font-variation-settings: 'GRAD' 88;
```

## 使用可变字体 @font-face 改变

加载可变字体的语法与任何其他Web字体非常相似，但有一些显着差异，这些字体是通过升级到现代浏览器中现有的传统@ font-face语法提供的。

基本语法是相同的，但可以指定字体技术，并且可以提供诸如font-weight和font-stretch之类的描述符的允许范围，而不是根据正在加载的字体文件命名。

[examples](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide#Using_a_variable_font_font-face_changes)

tips：

并非所有浏览器都实现了字体格式的完整语法，因此请仔细测试。 如果您将格式设置为仅文件格式，而不是格式变体（即woff2而不是woff2变体），那么支持可变字体的所有浏览器仍将呈现它们，但如果可能，最好使用正确的语法。

如果使用适当的属性（即font-weight或font-stretch），则为font-weight，font-stretch和font-style提供值范围将使浏览器不会尝试渲染超出该范围的轴，但不会 阻止您通过font-variation-settings提供无效值，因此请小心使用。

## 兼容旧浏览器

```css
h1 {
 font-family: some-non-variable-font-family;
}

@supports (font-variation-settings: 'wdth' 115) {
 h1 {
    font-family: some-variable-font-family;
 }
}
```
