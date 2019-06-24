
## 浏览器兼容性
package.json 的 browserslist 字段 或 单独的 .browserslistrc 文件，指定目标浏览器的范围。

如何配置浏览器范围：[browserslist](https://github.com/browserslist/browserslist)

转义js特性：[babel-preset-env](https://new.babeljs.io/docs/en/next/babel-preset-env.html)

自动添加css浏览器前缀：[autoprefixer](https://github.com/postcss/autoprefixer)

### browserslist


### Polyfill

useBuiltIns  "usage" | "entry" | false, defaults to false. -- [摘自babel文档](https://new.babeljs.io/docs/en/next/babel-preset-env.html#usebuiltins-usage)

false，适合构建库和Web Component，处理polyfill是应用这些库的应用的责任

'usage'，polyfill最小化，但是其中一个依赖需要特殊的polyfill时，默认情况下babel无法检测出来。

'entry'，这个得在入口文件处添加 require('@babel/polyfill') 或 import '@babel/polyfill' 且只能声明一次，多次声明会出错。 这样就不用担心polyfill的问题了，但是会包含一些没有用到的polyfill导致最终的包大小可能会增加。

### 现代模式

```js
npx vue-cli-service build --modern
```
这样会生成两个应用的版本，一个现代浏览器的，一个旧版本浏览器的。而且对部署没有特殊要求。生成的html文件自动使用[Phillip Walton 精彩的博文](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/)的技术，这个有点多，感兴趣的自己看下吧。


## [兼容 ECMAScript 5 的浏览器](https://caniuse.com/#feat=es5)