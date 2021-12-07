<script>
    export default {
        data() {
            return {
            };
        },
        methods: {
        }
    }
</script>
<style>
.md-box {
    margin-bottom: 20px;
}
.md-box:last-child {
    margin-bottom: 0px;
}
</style>
## Input

### 基本用法

::: demo
```html
<template>
    <div>
        <div class="md-box">
            <y-pagination :total="120" :index="2" />
        </div>
    </div>
</template>
```
:::

### 类型与大小

::: demo
```html
<template>
    <div>
        <div class="md-box">
            <y-input size="min" value="min input" />
        </div>
        <div class="md-box">
            <y-input size="medium" value="medium input" />
        </div>
        <div class="md-box">
            <y-input size="max" value="max input" />
        </div>
        <div class="md-box">
            <y-input type="password" value="password" />
        </div>
    </div>
</template>
```
:::

### 属性

| 参数      | 说明                             | 类型      | 可选值       | 默认值 |
| -------- | -------------------------------- | -------- | ----------- | ----- |
| value   | 绑定值 | string    | - | '' |
| size     | 输入框的大小                        | string   | min, medium, max | medium |
| type  | 输入框类型    | string   | text, password           | text |
| autofocus | 自动聚焦   | boolean   | -           | false |
| reg | 自定义校验规则   | RegExp   | -           | - |
| leftIcon | 左侧图标   | string   | -           | '' |
| quickClear | 快速清空   | boolean   | -           | false |
| disable | 是否处于disabled状态   | boolean   | -           | false |

### 事件

| 事件名称  | 说明                              | 事件参数  |
| -------- | -------------------------------- | -------- |
| input    | 输入事件 | value |
| focus    | 获取焦点事件 | Event, value |
| input    | 失去焦点事件 | Event, value |
| change    | 绑定值变化事件 | value |
