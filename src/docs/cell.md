<script>
    export default {
        data() {
            return {
                label: 'this IS a Cell'
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
## Cell

### 基本用法

::: demo
```html
<template>
    <y-cell :label="label" />
</template>
<script>
    export default {
        data() {
            return {
                label: 'this IS a Cell'
            };
        }
    }
</script>
```
:::

### 高亮 & 模糊匹配

::: demo
```html
<template>
    <div>
        <div class="md-box">
            <y-cell :label="label" highLight="IS" />
        </div>
        <div class="md-box">
            <y-cell :label="label" highLight="IS" :highlight-case-convert="true" />
        </div>
        <div class="md-box">
            <y-cell :label="label" highLight="IS" />
        </div>
        <div class="md-box">
            <y-cell :label="label" highLight="IS" highlight-color="red" />
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                label: 'this IS a Cell'
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
