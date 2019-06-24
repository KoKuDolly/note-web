const path = require('path');
module.exports = {
  mode: 'production', // "production"|"development"|"none", production 开启优化功能；development 开启开发的有用工具；
  entry: {
    a: "",
    f: ["", ""],
    b: {
      c: "",
      d: ["", ""],
      e: {}
    }
  }, // string | object | array
  output: {
    path: path.resolve(__dirname, "dist"), // string, 必须是绝对路径，所有输出文件的目标路径，
    filename: "bundle.js", // string  "[name].js" -- 用于多个入口点（出口点）  "[chunkhash].js" -- 长效缓存
    // 入口分块的文件名模板
    publicPath: "/assets/", // string "" "/assets/" "https://cdn.example.com/"
    // 输出解析文件的目录，url 相对于 HTML 页面
    library: "", // string 导出库的名称
    libraryTarget: "umd", // 通用模块定义
    // 导出库的类型    umd2 -- 通用模块定义; commonjs2 -- exported with module.exports; commonjs -- 作为exports的属性导出; amd -- 使用AMD定义方法来定义; this -- 在this上设置属性; var -- 变量定义于根作用域下; assign -- 盲分配(blind assignment); window -- 在window对象上设置属性; global -- property set to global object; jsonp-- jsonp wrapper;
    /* 高级输出配置 */
    pathinfo: true, // 在生成代码时，引入相关的模块、导出、请求等有帮助的路径信息
    chunkFilename: "[id].js", // 附加分块（additional chunk）的文件名模板
    jsonpFunction: "", // 用于加载分块的 JSONP 函数名
    sourceMapFilename: "", // source map 位置 的文件名模板  建议只使用[file].map，其他占位符在非chunk文件生成的SourceMap 时不起作用。
    devtoolModuleFilenameTemplate: "", // devtool 中模块 的文件名模板
    devtoolFallbackModuleFilenameTemplate: "", // devtool 中模块 的文件名模板（用于冲突）
    umdNamedDefine: true, // 在 UMD 库中使用命名的 AMD 模块
    crossOriginLoading: "", // 指定运行时如何发出跨域请求问题 "use-credentials"(枚举)/"anonymous"/false
  },
  module: {
    rules: [ // 创建模块时，匹配请求的规则数组。这些规则能够修改模块的创建方式。这些规则能够对模块module应用loader，或者直接修改解析器parser。规则就是下面的每个对象。
      { // Rule， 分为三部分： 条件 condition，结果 result ，嵌套规则 nested rule。
        // 1. condition
        // 两种方式：1，resource，请求文件的绝对路径，已经由resolve规则解析；2，issuer，被请求资源的绝对路径。时导入时的位置。
        // 在规则中，resource（属性 test,include,exclude,）对 resource 匹配， 属性 issuer 对 issuer 匹配。
        resource: { // 请求资源的路径
          test: /\.jsx?$/, // Rule.resource.test 简写，一般是提供一个正则表达式或正则表达式的数组，但这不是强制的。
          include: [path.resolve(__dirname, 'app')], // Rule.resource.include 简写。一般是提供一个字符串或者字符串数组，但这不是强制的。
          exclude: [path.resolve(__dirname, "app/demo-files")], // Rule.exclude 是 Rule.resource.exclude 的简写。一般是提供一个字符串或者字符串数组，但这不是强制的。
          and: [Condition], // 必须匹配数组中的所有条件
          or: [Condition], // 匹配数组中任何一个条件
          not: [Condition] // 必须排除这些条件
        },
        // 以上都是，提供了这些属性，就不能再提供 Rule.resource 。
        // 这里是匹配条件，每个选项都接收一个正则表达式或字符串
        // test 和 include 具有相同作用，都是必须匹配选项
        // exclude 是必不匹配选项（优先于 test 和 include ）
        // 最佳实践：
        // - 只在 test 和 文件名匹配 中使用正则表达式
        // - 在 include 和 exclude 中使用绝对路径数组
        // - 尽量避免 exclude，更倾向于使用 include
        resourceQuery: /\.css$/, // 条件匹配时，在资源后加query参数匹配，例如用于多个相同loader但是每个loader的应用场景不一时。
        issuer: { // 这是 被请求资源文件路径，也就是资源发起者（issuer）的路径。用来给特定模块或一组模块添加loader依赖。
          test: 'a文件路径',
          include: ['a文件路径', 'b文件路径'],
          exclude: ['a文件路径', 'a文件路径'],
          and: [Condition], // 必须匹配数组中的所有条件
          or: [Condition], // 匹配数组中任何一个条件
          not: [Condition] // 必须排除这些条件
        },
        // 2. result，规则结果只在规则条件匹配时使用。
        // 规则有两种输入值，1. 应用在 resource 上 use 选项。2. Parser 选项，用于为模块所创建解析器的选项对象。
        // use 为一个数组，放着一个或多个 UseEntry， UseEntry 包含loader， options 属性。兼容的 query 现在替换为 options ， 兼容的 loaders 现在替换为 use
        // enforce 属性会影响 loader 种类，不论时普通，前置，后置的loader。
        // parser 属性影响 parser 选项。
        parser: { // parser 默认值
          amd: false, // 禁用 AMD
          commonjs: false, // 禁用 CommonJS
          system: false, // 禁用 SystemJS
          harmony: false, // 禁用 ES2015 Harmony import/export
          requireInclude: false, // 禁用 require.include
          requireEnsure: false, // 禁用 require.ensure
          requireContext: false, // 禁用 require.context
          browserify: false, // 禁用特殊处理的 browserify bundle
          requireJs: false, // 禁用 requirejs.*
          node: false, // 禁用 __dirname, __filename, module, require.extensions, require.main 等。
          node: {} // 在模块级别(module level)上重新配置 node 层(layer)
        },
        enforce: 'pre', // pre, post, 标识应用这些规则，即使规则覆盖
        // loader: 'babel-loader', // Rule.use: [ { loader } ] 的简写。
        // // Rule.loaders 已废弃，因为要支持 use 。是 use 的别名。
        // options: { // Rule.use: [ { options } ] 的简写。
        //   presets: ['env']
        // }
        // 多个 use 处理方式： 1，oneOf 包着，只能使用其中一条 use，匹配对应的条件。类似于 test，进一步的筛选。resourceQuery/test 属性都可以使用，没有进一步筛选的属性的话，就是默认使用外层的 test 条件。
        use: [ // 使用多个 loader
          { // UseEntry 就是这个对象，每个 loader 的名字和配置项
            loader: 'babel-loader', // 必须属性
            options: {
              presets: ['env'],
            }
          }
        ]
      },
      {
        // 3. nested rule
        // 可以使用属性 rules 和 oneOf 指定嵌套规则。 这些规则用于在规则条件匹配时进行取值。
        // rules 和 oneOf, 在规则条件（rule condition）匹配时进行取值。
        // 只能使用这些嵌套规则之一
        oneOf: []
      },
      // 使用所有这些嵌套规则（合并可用条件）
      {
        rules: []
      },
    ],
    /* 高级模块配置 */
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/, // [RegExp] | function 防止 webpack 解析这些文件。忽略的这些文件中不应该含有 import, require, define 的调用，或任何其他导入机制。忽略大型的library可以提高构建性能。
  },
  resolve: {
    // 解析模块请求的选项
    // 不适用于对 loader 解析
    modules: [ // 告诉webpack解析模块时应该搜索的目录
      "node_modules",
      path.resolve(__dirname, "app")
    ],
    extensions: [".js", ".json", ".jsx", ".css"], // 自动解析确定的扩展。
    alias: { // 创建 import 或 require 的别名，来确保模块引入变得更简单
      // 模块别名列表
      "module": "new-module",
      // 起别名： 
    }

  },
  performance: { // 性能
    hints: "warning", // warning, error, false 
    maxAssetSize: 200000, // 最大资源大小
    maxEntrypointSize: 400000, // 最大入口点文件大小
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js'); // 只列出css文件和js文件的性能提示
    }
  },
  devtool: "", // enum 枚举 source-map/inline-source-map/eval-source-map/hidden-source-map/cheap-source-map/cheap-module-source-map/eval/none
  context: "",
  target: "",
  externals: [],
  serve: {
    port: 1223,
    content: './dist'
  },
  stats: "", // 统计信息，可以玩玩
  devServer: {
    proxy: {
      '/api': 'http://localhost:3000'
    },
    contentBase: "",
    compress: true,
    historyApiFallback: true,
    hot: true,
    https: false,
    noInfo: true,
  },
  plugins: [

  ],
  /* 高级配置 */
  resolveLoader: {}, // 与 resolve 对象的属性集合相同，但仅用于解析 webpack 的 loader 包。默认：
}
