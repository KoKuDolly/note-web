

module.exports = {
  publicPath: '/', // 相当于 webpack 的 output.publicPath，为项目的部署路径
  outputDir: 'dist', // 相当于 webpack 的 output.path，为打包生成生产环境文件的目录
  assetsDir: '', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录，从生成的资源覆写 filename 或 chunkFilename 时，assetsDir 会被忽略
  indexPath: 'index.html', // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径，默认是 'index.html'
  filenameHashing: true, // 在不使用 vue-cli 自动生成的 html 文件时，可以关闭 文件名hash 缓存机制-静态资源。

  // pages: {}, // TODO

  lintOnSave: true, // 是否在开发环境通过 eslint-loader 在每次保存时 lint 代码。这个在 @vue/cli-plugin-eslint 被安装后生效。
  runtimeCompiler: false,
  transpileDependencies: [],
  productionSourceMap: true, // 生产环境不需要source map，设置为false，加速生产环境构建。

  // crossorigin: 'anonymous', // TODO 这里需要了解 CORS 的细节。 example: <script src="https://example.com/example-framework.js" crossorigin="anonymous"></script>

  integrity: false, // CDN 部署时提高安全性，启用 SRI， preload resource hints 会禁用。example: <script src="https://example.com/example-framework.js" integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC" crossorigin="anonymous"></script>

  // configureWebpack: Object || Function, // TODO

  // https://github.com/neutrinojs/webpack-chain#getting-started   熟悉 webpack-chain 的 API
  // chainWebpack: Function, // TODO 

  css: {
    modules: false, // 设置为true的话，所有的 *.(css|scss|sass|less|styl(us)?) 视为 CSS Modules 模块，否则 只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。

    extract: true,
    // extract: Boolean || Object, // TODO 问题1：提取 css 有什么好处？参考webpack分离css。问题2：什么是 Web Components？ 问题3：构建库，避免用户导入自己的css。
    sourceMap: true, // 设置为 true 可能会影响性能。默认 false

    loaderOptions: { // 向预处理器 Loader 传递选项，请关注各个 loader 的使用文档
      css: {/* 这里的选项会传递给 css-loader */},
      postcss:{/* 这里的选项会传递给 postcss-loader */},
      sass: {/* 这里的选项会传递给 sass-loader */},
      less: {/* 这里的选项会传递给 less-loader */},
      stylus: {/* 这里的选项会传递给 stylus-loader */}
    }
  },

  devServer: { // 请关注 webpack-dev-server 的使用文档
    proxy: '', // TODO 前端应用和后端api服务器没有运行在一台主机上，需要配置
  },
  // webpack-dev-serve 和 http-proxy-middleware 以及 webpack-dev-middleware
  // 本地启动一个开发服务器，配合vue-router，vuex，跳转的每个路由中定义的页面，加载的本地css，图片，js等都属于静态资源。远程的数据不属于静态文件，对于这些需要配置代理。那么，怎么理解本地开发服务器到底干了些什么呢？

  parallel: require('os').cpus().length > 1, // 是否为 Babel 和 TypeScript 使用 thread-loader。该选项在系统的 cpu 有多余一个内核时自动启动，仅作用于生产环境构建。又理解了一个打包速度快的原因之一。

  // pwa: Object, // 向 PWA插件 传递选项，

  pluginOptions: { // 这是一个不进行任何 schema 验证的对象，因此它可以用来传递任何第三方插件选项 ???? 什么是 schema 验证？

  }
}