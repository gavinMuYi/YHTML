<script>
    export default {
        data() {
            return {
                popStatus: false,
                popContent: '请输入改变pop内容长度，查看边界碰撞情况'
            };
        },
        methods: {
            trigger() {
                if (!this.popStatus) {
                    this.$refs.manual.showPop();
                } else {
                    this.$refs.manual.hidePop();
                }
                this.popStatus = !this.popStatus;
            }
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
.md-pop-trigger {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    padding: 6px 20px;
}
</style>
## Popper

### 基本用法

::: demo
```html
<template>
    <div>
        <div class="md-box">
            <span v-ypop:hovertip.hover class="md-pop-trigger">hover</span>
            <y-popper ref="hovertip">hover pop</y-popper>
        </div>
    </div>
</template>
```
:::

### 触发方式

::: demo
```html
<template>
    <div>
        <div class="md-box">
            <span v-ypop:hovertip.hover class="md-pop-trigger">hover</span>
            <y-popper ref="hovertip">hover pop</y-popper>
        </div>
        <div class="md-box">
            <span v-ypop:hoverdtip.hover.delay class="md-pop-trigger">hover delay</span>
            <y-popper ref="hoverdtip">hover delay pop</y-popper>
        </div>
        <div class="md-box">
            <span v-ypop:clicktip.click class="md-pop-trigger">click</span>
            <y-popper ref="clicktip">click pop</y-popper>
        </div>
        <div class="md-box">
            <span v-ypop:rclicktip.rightClick class="md-pop-trigger">right click</span>
            <y-popper ref="rclicktip">right click pop</y-popper>
        </div>
        <div class="md-box">
            <y-button @click="trigger">trigger</y-button>
            <span v-ypop:manual.manual class="md-pop-trigger">manual</span>
            <y-popper ref="manual">manual pop</y-popper>
        </div>
        <div class="md-box">
            <span v-ypop:show.show class="md-pop-trigger">show</span>
            <y-popper ref="show">show pop</y-popper>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                popStatus: false
            };
        },
        methods: {
            trigger() {
                if (!this.popStatus) {
                    this.$refs.manual.showPop();
                } else {
                    this.$refs.manual.hidePop();
                }
                this.popStatus = !this.popStatus;
            }
        }
    }
</script>
```
:::

### 位置与适配

::: demo
```html
<template>
    <div>
        <div class="md-box">
            <span v-ypop:hovertipl.hover class="md-pop-trigger">left-start hover</span>
            <y-popper ref="hovertipl" placement="left-start">left-start hover pop</y-popper>
        </div>
        <div class="md-box">
            <span v-ypop:hovertipp.show class="md-pop-trigger">priority trigger</span>
            <y-popper ref="hovertipp" placement="right-middle"  :priority="['right-middle', 'top-middle', 'bottom-start', 'left-middle']">priority show pop</y-popper>
        </div>
        <div class="md-box">
            <y-input v-model="popContent" style="width:400px" />
        </div>
        <div class="md-box">
            <span v-ypop:hovertippp.show class="md-pop-trigger">content change trigger</span>
            <y-popper ref="hovertippp" placement="right-end">{{ popContent }}</y-popper>
        </div>
    </div>
</template>
```
:::

### 属性

| 参数      | 说明                             | 类型      | 可选值       | 默认值 |
| -------- | -------------------------------- | -------- | ----------- | ----- |
| clazz   | 弹窗自定义类名 | string    | - | '' |
| placement     | 弹窗位置  | string   | 见popper | bottom-middle |
| priority  | 弹窗位置优先级  | array   | 见popper  | [] |
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
