# webpack 相关

1. 简单的配置方式

2. 链式操作 (高级) -- chainWebpack

[熟悉 webpack-chain 的 API](https://github.com/neutrinojs/webpack-chain#getting-started)

[cli-service 部分源码](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/lib/config)，在安装包的 '/lib/config/' 目录下

3. 审查项目的 webpack 配置

vue inspect 是 vue-cli-service inspect 的代理

源码在这个目录下： **'<projectRoot>/node_modules/@vue/cli-service/webpack.config.js'**

vue inspect 的使用

```
// 输出配置到一个 output.js 的文件中 （用这个可以在文件里面仔细看，下面的是方便在控制台中查看其中一点的内容）
vue inspect > output.js

// 只审查第一条规则
vue inspect module.rules.0

// 指向一个规则
vue inspect --rule vue

// 指向一个插件
vue inspect --plugin html

// 列出所有规则
vue inspect --rules

// 列出所有插件
vue inspect --plugins
```