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
| placement     | 弹窗位置  | string   | left-start, left-middle, left-end, right-start, right-middle, right-end, top-start, top-middle, top-end, bottom-start, bottom-middle, bottom-end | bottom-middle |
| priority  | 弹窗位置适配优先级  | array   | 同placement  | [] |
| inline | 弹框的DOM是否需要移动到body上，true表示不移动   | boolean   | -       | false |
