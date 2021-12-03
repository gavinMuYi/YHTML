<script>
    export default {
        data() {
            return {};
        },
        methods: {
            ddd() {
                console.log('ddd');
            }
        }
    }
</script>
## Button

### 基本用法

::: demo
```html
<template>
    <div @click="ddd"><y-button>asdas</y-button><div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        methods: {
            ddd() {
                console.log('ddd');
            }
        }
    }
</script>
```
:::

### 属性

| 参数      | 说明                             | 类型      | 可选值       | 默认值 |
| -------- | -------------------------------- | -------- | ----------- | ----- |
| status   | 按钮的样式类型 | string    | default, primary, warning, success | default |
| size     | 按钮的大小                        | string   | medium, large | medium |
| loading  | 是否处于loading状态    | boolean   | -           | false |
| disabled | 是否处于disabled状态   | boolean   | -           | false |
| href     | 按钮实际为a标签，其地址              | string   | -           | - |
| target   | 按钮实际为a标签，其target值         | string   | -           | - |
| icon   | 按钮内嵌图标名称         | string   | -           | - |
### Slot

| Slot名称  | 说明                             |
| -------- | -------------------------------- |
| default  | 默认的slot，作为按钮的内容 |

### 事件

| 事件名称  | 说明                              | 事件参数  |
| -------- | -------------------------------- | -------- |
| click    | 点击事件 | Event |
