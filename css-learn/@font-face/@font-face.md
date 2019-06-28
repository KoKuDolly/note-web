# @font-face

## syntax

>@font-face {
>
> [ font-family: \<family-name>; ] ||
>
> [ src: \<src>; ] ||
>
> [ unicode-range: \<unicode-range>; ] ||
>
> [ font-variant: \<font-variant>; ] ||
>
> [ font-feature-settings: \<font-feature-settings>; ] ||
>
> [ font-variation-settings: \<font-variation-settings>; ] ||
>
> [ font-stretch: \<font-stretch>; ] ||
>
> [ font-weight: \<font-weight>; ] ||
>
> [ font-style: \<font-style>; ]
>
>}
>
>where
>
>\<family-name> = \<string> | \<custom-ident>+  字符串或者自定义字符（注意一些不可用字符）

## 详细解释

**font-display**: 确定一个字体当其加载完成准备就绪时如何显示；

*mdn解释：*

>**解释：** 定义这个字体在未加载，加载中，加载就绪后，使用到该字体的元素的字体展现方式
>
>**取值：** [ auto | block | swap | fallback | optional ]
>
>**block：** 未加载该字体时，必须显示不可见的备用字体；
>
>**swap：** 未加载该字体时，必须显示备用字体；该字体加载成功后，都正常显示。
>
>**字体加载有三个时间线：** font block period；font swap period；font failure perio

**font-family**：字体属性中，使用到的字体名

**font-stretch**：字体拉伸

>Syntax
>
>normal
>
>condensed: semi-condensed, condensed, extra-condensed, ultra-condensed
>
>expanded: semi-expanded, expanded, extra-expanded, ultra-expanded
>
>percentage 例如：between 50% and 200%，不允许负值

**font-style**：Formal syntax: normal | italic | oblique \<angle>{0,2}

**font-weight**：值，或范围。

**font-variant**：字体变种

**font-feature-settings**：允许控制OpenType字体中的高级印刷功能

**font-variation-settings**：通过指定要更改的要素的四个字母轴名称及其变化值，允许对OpenType或TrueType字体变体进行低级控制。

**src**：指定包含字体数据的资源。这可以是远程字体文件位置的URL或用户计算机上字体的名称。可用的类型是：“woff”，“woff2”，“truetype”，“opentype”，“embedded-opentype”和“svg”

**unicode-range**：要从字体中使用的Unicode代码点范围

## Font MIME Types

Format|MIME type|
-|-|
TrueType|font/ttf
OpenType|font/otf
Web Open File Format|font/woff
Web Open File Format 2|font/woff2

## link

[@font-face mdn解释](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face)
