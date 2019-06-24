# css

[参考链接](https://github.com/yangshun/front-end-interview-handbook/blob/master/Translations/Chinese/README.md)

## 用户界面 User Interface

```css
appearance: ie 不支持；
text-overflow: clip | ellipsis; // 裁切/...。 overflow:hidden;width:200px;white-space:nowrap;text-overflow:ellipsis;
// 要使得 <' text-overflow '> 属性生效，块容器必须显式定义 <' overflow '> 为非visible值，同时显式或者隐式的定义 <' width '> 为非auto值， <' white-space '> 为nowrap值。
outline
outline-width
outline-style
outline-color
outline-offset
cursor: url() x y;/auto/default/none/...
zoom // 缩放比例
resize: none/both/horizontal/vertical; // ie, ios, android 不支持。
user-select
pointer-events
box-sizing: border-box/content-box;
```

## display

### display 的 basic 系列

```css
none, 不保留物理空间
inline,
block,
inline-block
```

### display 的 table 系列

```css
display: table;
display: inline-table;
display: table-caption; 相当于 caption 标签
display: table-column; 相当于 col 标签  // col 与 colgroup 标签的理解: 给他们定类，写css样式，只有width样式可用。span作为标签属性使用，表示影响的列的范围。其他属性均不太好用。
display: table-column-group; 相当于 colgroup 标签
display: table-header-group; 相当于 thead 标签
display: table-footer-group; 相当于 tfoot 标签
display: table-row-group; 相当于 tbody 标签
display: table-row; 相当于 tr 标签
display: table-cell; 相当于 td 标签, 没有th对应的属性，要想模拟th，就得给table-cell这个标签添加css样式
```

### display 的 伸缩盒子系列

```css
box, 伸缩盒最老版本
inline-box, 伸缩盒最老版本
flexbox, 伸缩盒过渡版本
inline-flexbox, 伸缩盒过度版本
flex, 伸缩盒最新版本
inline-flex, 伸缩盒最新版本
```

### qita

```css
run-in: 上下文决定
list-item: 列表项目
```

## position

position: static/relative/absolute/fixed/center/page/sticky

[mdn](https://developer.mozilla.org/en-US/docs/Web/CSS/position)

[本地案例](./position.html)

适用于：除 <' display '> 属性定义为「table-column-group | table-column」之外的所有元素

## 浏览器滚动条 TODO

[参考](https://www.cnblogs.com/koleyang/p/5484922.html)

## margin 塌陷问题 与 margin 合并问题

### margin 塌陷问题

[塌陷问题描述](../2019-03-07/margin.collapse.html)
解决方案： 1. 设置父元素border 2. overflow: hidden; 3. 设置父元素padding值

方案2，是触发bfc。触发bfc的方式，例如： position: absolute/fixed; display: inline-block; float: left/right; overflow: hidden;

### margin 合并问题

margin 合并问题的话，可以给单独一个或者两个元素包一层父元素，并使各自父元素变为bfc，但是不推荐。实际操作是只设置其中一个的margin值。

## flex & grid TODO

## 视网膜分辨率图形的使用 TODO

## inline-block 元素之间的留白去除

[链接](https://www.zhangxinxu.com/wordpress/2012/04/inline-block-space-remove-%E5%8E%BB%E9%99%A4%E9%97%B4%E8%B7%9D/)

[英文链接](https://css-tricks.com/fighting-the-space-between-inline-block-elements/)

### 几个例子：

- font-size: 0

```css
.space {
    font-size: 0;
}
.space a {
    font-size: 12px;
}
```

- letter-spacing

```css
.space {
    letter-spacing: -3px;
}
.space a {
    letter-spacing: 0;
}
```

- word-spacing

```css
.space {
    display: inline-table;
    word-spacing: -6px;
}
.space a {
    word-spacing: 0;
}
```

- 改变html结构：折行处加注释；或者标签之间链接，折行发生在标签内；

- margin 负值

- 闭合标签吃胶囊，但是兼容性比较差。去掉闭合标签的意思。