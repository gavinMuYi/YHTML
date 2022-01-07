<script>
    export default {
        data() {
            return {
                visible: false
            };
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
## Dialog

### 基本用法

::: demo
```html
<template>
    <y-button @click="visible = true">trigger</y-button>
    <y-dialog v-model="visible">
        <div>dialog content</div>
    </y-dialog>
</template>
<script>
    export default {
        data() {
            return {
                visible: false
            };
        },
        methods: {
        }
    }
</script>
```
:::

### 属性

| 参数      | 说明                             | 类型      | 可选值       | 默认值 |
| -------- | -------------------------------- | -------- | ----------- | ----- |
| visible   | 弹窗显示状态 | boolean    | - | false |
| value   | 弹窗显示状态,v-model | boolean    | - | false |


### Slot

| Slot名称  | 说明                             |
| -------- | -------------------------------- |
| default  | 默认的slot，作为dialog的内容 |

### 事件

| 事件名称  | 说明                              | 事件参数  |
| -------- | -------------------------------- | -------- |
| visibleChange    | dialog开关事件 | visibleStatus |
