# vue 风格指南

[文档链接](https://cn.vuejs.org/v2/style-guide/)

## 优先级A

## Prop 定义

```js
validator
```

## 避免 `v-if`  `v-for` 用在一起

## 为组件样式设置作用域

```html
<template>
  <button :class="[$style.button, $style.buttonClose]">X</button>
</template>

<!-- 使用 CSS Modules -->
<style module>
.button {
  border: none;
  border-radius: 2px;
}

.buttonClose {
  background-color: red;
}
</style>
```

```html
<template>
  <button class="c-Button c-Button--close">X</button>
</template>

<!-- 使用 BEM 约定 -->
<style>
.c-Button {
  border: none;
  border-radius: 2px;
}

.c-Button--close {
  background-color: red;
}
</style>
```

## 私有属性名

```js
$_myAttr_update () {

}
```

## 优先级B

## 组件文件  写在文件夹中，单独成文件

## 单文件组件大小写

```html
components/
|- MyComponent.vue
components/
|- my-component.vue
```

## 基础组件名以 `Base`  `App` `V` 开头

## 单例组件名 以 *The* 前缀命名

## 紧密耦合的组件名  和父组件紧密耦合的子组件应该以父组件名作为前缀命名

## 组件名中的单词顺序

~~~html
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
~~~

::: danger
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
:::

## 模板中的组件名大小写

```html
<!-- 在单文件组件和字符串模板中 -->
<MyComponent/>
<!-- 在 DOM 模板中 -->
<my-component></my-component>
或者

<!-- 在所有地方 -->
<my-component></my-component>
```

## js/jsx 中组件名大小写

只要是被js引用的，按照 PascalCase 命名；但是在 DOM 中 必须使用 kebab-case； 所以在 全局组件 *Vue.component* 中，可以使用 kebab-case；

## prop 名大小写

在声明 prop 的时候，其命名应该始终使用 camelCase，而在模板和 JSX 中应该始终使用 kebab-case

## 优先级C

## 组件/实例 选项的 顺序

1. 副作用（触发组件外的影响） el

2. 全局感知（要求组件以外的知识）  name parent

3. 组件类型（更改组件的类型) functional

4. 模板修改器（改变模板的编译方式） delimiters comments

5. 模板依赖（模板内使用的资源）
components
directives
filters

6. 组合（向选项里合并属性）
extends  mixins

7. 接口 (组件的接口)
inheritAttrs
model
props/propsData

8. 本地状态 (本地的响应式属性)
data computed

9. 事件 (通过响应式事件触发的回调)
watch  生命周期钩子

10. 非响应式属性
methods

11. 渲染 (组件输出的声明式描述)
template/render
renderError

## 元素特性的顺序

1. 定义 (提供组件的选项) is

2. 列表渲染 (创建多个变化的相同元素) v-for

3. 条件渲染 (元素是否渲染/显示)
v-if v-else-if v-else v-show v-cloak

4. 渲染方式 (改变元素的渲染方式) v-pre v-once

5. 全局感知 (需要超越组件的知识) id

6. 唯一的特性 (需要唯一值的特性) ref key slot

7. 双向绑定 (把绑定和事件结合起来) v-model

8. 事件 (组件事件监听器) v-on

9. 内容 (覆写元素的内容) v-html v-text