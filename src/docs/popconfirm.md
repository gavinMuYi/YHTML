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
## Popconfirm

### 基本用法

::: demo
```html
<template>
    <div>
        <div class="md-box">
            <y-button v-ypopconfirm:pop.click>
                trigger
            </y-button>
            <y-popconfirm ref="pop" content="这是一个基础确认框，确认关闭？" />
        </div>
        <div class="md-box">
            <y-button v-ypopconfirm:pop2.click>
                slot trigger
            </y-button>
            <y-popconfirm ref="pop2">
                这是一个基础确认框Slot，确认关闭？
            </y-popconfirm>
        </div>
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
| clazz   | 弹窗自定义类名 | string    | - | '' |
| placement     | 弹窗位置  | string   | 见popper | bottom-middle |
| priority  | 弹窗位置适配优先级  | array   | 见popper  | [] |
| selected | 选中项，值同option.key   | number, string   | -           | - |
| options | 选项   | array   | -           | [] |
| maps | 选项映射关系   | object   | -           | {key, label, disable} |
| highlight | 高亮字段   | string   | -           | '' |
| highlightCaseConvert | 高亮模糊匹配大小写   | boolean   | -           | false |
| highlightColor | 高亮颜色   | string   | -       | #00cc26 |
| showSelect | 选中项回显   | boolean   | -       | false |

### 事件

| 事件名称  | 说明                              | 事件参数  |
| -------- | -------------------------------- | -------- |
| change    | 选中事件 | optionItem |
