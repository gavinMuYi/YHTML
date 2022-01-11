<script>
    export default {
        data() {
            return {
                rightSpan: 3
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
.md-content {
    height: 50px;
    border: 1px solid;
}
.md-s-content {
    height: 20px;
    border: 1px solid red;
}
</style>
## Layout

### 基本用法

::: demo
```html
<template>
    <y-button @click="rightSpan++">add</y-button>
    <y-row :gutter="10">
        <y-col :span="5" :left-span="5">
            <div class="md-content"></div>
        </y-col>
        <y-col :span="7" :right-span="rightSpan">
            <div class="md-content"></div>
        </y-col>
        <y-col :span="20" :left-span="2" :right-span="5">
            <y-row :gutter="5">
                <y-col :span="5" :left-span="5">
                    <div class="md-s-content"></div>
                </y-col>
                <y-col :span="7" :right-span="rightSpan">
                    <div class="md-s-content"></div>
                </y-col>
                <y-col :span="20" :left-span="2" :right-span="5">
                    <div class="md-s-content"></div>
                </y-col>
            </y-row>
        </y-col>
    </y-row>
</template>
<script>
    export default {
        data() {
            return {};
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
| status   | 按钮的样式类型 | string    | default, primary, warning, error | default |
| size     | 按钮的大小                        | string   | min, medium, max | medium |
| loading  | 是否处于loading状态    | boolean   | -           | false |
| disable | 是否处于disabled状态   | boolean   | -           | false |

### Slot

| Slot名称  | 说明                             |
| -------- | -------------------------------- |
| default  | 默认的slot，作为按钮的内容 |

### 事件

| 事件名称  | 说明                              | 事件参数  |
| -------- | -------------------------------- | -------- |
| click    | 点击事件 | Event |
