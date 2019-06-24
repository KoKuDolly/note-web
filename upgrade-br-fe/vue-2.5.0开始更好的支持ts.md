[博文地址（来自Evan You）](https://medium.com/the-vue-point/upcoming-typescript-changes-in-vue-2-5-e9bd7e2ecf08)
Sep 21, 2017

以上地址可能需要个代理才能访问

大概意思如下：

>2.0开始已经支持了ts写法，但是由于ts的问题，只能写class类型的代码才行。
>
>2.5.x开始，由于ts的新特性，以及vue的升级，写基于 vue + ts 的代码可以不用以class类型的代码编写了，对于非class风格的老项目来说是件好事。
>
>基于vue + ts 编写代码的话，要把vue升级到2.5.x+，与vue相关的核心库也要和vue版本匹配到新的版本。新的 vue-cli 已经将 ts 集成，这简化了ts项目的搭建。使用者只需要关注tsconfig.json文件中的ts配置以及ts的语法即可。

下面，在讲下vue中ts的使用细节。

