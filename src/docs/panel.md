<script>
    export default {
        data() {
            return {};
        },
        methods: {
            open(key) {
                this.$refs[key].open();
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
</style>
## Panel

### 基本用法

::: demo
```html
<template>
    <y-button @click="open('panel1')">trigger</y-button>
    <y-panel ref="panel1">
        <div>panel content</div>
    </y-panel>
</template>
<script>
    export default {
        data() {
            return {};
        },
        methods: {
            open(key) {
                this.$refs[key].open();
            }
        }
    }
</script>
```
:::

### 位置

::: demo
```html
<template>
    <y-button @click="open('panell')">left trigger</y-button>
    <y-panel ref="panell" position="left">
        <div>panel content</div>
    </y-panel>
    <y-button @click="open('panelr')">right trigger</y-button>
    <y-panel ref="panelr" position="right">
        <div>panel content</div>
    </y-panel>
    <y-button @click="open('panelt')">top trigger</y-button>
    <y-panel ref="panelt" position="top">
        <div>panel content</div>
    </y-panel>
    <y-button @click="open('panelb')">bottom trigger</y-button>
    <y-panel ref="panelb" position="bottom">
        <div>panel content</div>
    </y-panel>
</template>
<script>
    export default {
        data() {
            return {};
        },
        methods: {
            open(key) {
                this.$refs[key].open();
            }
        }
    }
</script>
```
:::

### 属性

| 参数      | 说明                             | 类型      | 可选值       | 默认值 |
| -------- | -------------------------------- | -------- | ----------- | ----- |
| position   | 弹窗位置 | string    | left, right, top, bottom | right |
| visible   | 弹窗显示状态 | boolean    | - | false |

### Slot

| Slot名称  | 说明                             |
| -------- | -------------------------------- |
| default  | 默认的slot，作为panel的内容 |

### 事件

| 事件名称  | 说明                              | 事件参数  |
| -------- | -------------------------------- | -------- |
| visibleChange    | panel开关事件 | visibleStatus |
