<script>
    export default {
        data() {
            return {
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
## ColorPicker

### 基本用法

::: demo
```html
<template>
    <div class="md-box">
        <y-color-picker />
    </div>
</template>
<script>
    export default {
        data() {
            return {
            };
        }
    }
</script>
```
:::

### 属性

| 参数      | 说明                             | 类型      | 可选值       | 默认值 |
| -------- | -------------------------------- | -------- | ----------- | ----- |
| label   | 文案 | string    | - | '' |
| highlight     | 高亮字符                        | string   | - | '' |
| highlightCaseConvert  | 是否模糊匹配大小写    | boolean   | -           | false |
| highlightColor | 高亮色   | string   | -           | #00cc26 |
