# mime

媒体类型（通常称为 Multipurpose Internet Mail Extensions 或 MIME 类型 ）是一种标准，用来表示文档、文件或字节流的性质和格式。

浏览器通常使用MIME类型（而不是文件扩展名）来确定如何处理URL，因此Web服务器在响应头中添加正确的MIME类型非常重要。如果配置不正确，浏览器可能会曲解文件内容，网站将无法正常工作，并且下载的文件也会被错误处理。

## 语法

### 通用结构

```js
  type/subtype
```

MIME的组成结构非常简单；由类型与子类型两个字符串中间用'/'分隔而组成。不允许空格存在。type 表示可以被分多个子类的独立类别。subtype 表示细分后的每个类型。

### 独立类型

```str
  text/plain
  text/html
  image/jpeg
  image/png
  audio/mpeg
  audio/ogg
  audio/*
  video/mp4
  application/*
  application/json
  application/javascript
  application/ecmascript
  application/octet-stream
```

### [MDN链接](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
