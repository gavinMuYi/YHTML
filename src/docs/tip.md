<script>
    export default {
        data() {
            return {
                disable: false,
                tipStatus: false,
                tipContent: '请输入改变tip内容长度，查看边界碰撞情况'
            };
        },
        methods: {
            trigger() {
                if (!this.tipStatus) {
                    this.$refs.manual.showPop();
                } else {
                    this.$refs.manual.hidePop();
                }
                this.tipStatus = !this.tipStatus;
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
.md-tip-trigger {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    padding: 6px 20px;
}
</style>
## Tip

### 基本用法

::: demo
```html
<template>
    <div>
        <div class="md-box">
            <span v-ytip:tip.hover class="md-tip-trigger">hover</span>
            <y-tip ref="tip">hover tip</y-tip>
        </div>
    </div>
</template>
```
:::

### 大小类型

::: demo
```html
<template>
    <div>
        <div class="md-box">
            <span v-ytip:tip1.hover class="md-tip-trigger">hover</span>
            <y-tip ref="tip1">hover tip</y-tip>
        </div>
        <div class="md-box">
            <span v-ytip:tip2.hover class="md-tip-trigger">hover</span>
            <y-tip ref="tip2" kind="large">hover tip</y-tip>
        </div>
    </div>
</template>
```
:::

### 复用tip

::: demo
```html
<template>
    <div>
        <div class="md-box">
            <span v-ytip:fp.hover="{data: 'a'}" class="md-tip-trigger">a hover</span>
            <span v-ytip:fp.hover="{data: 'b'}" class="md-tip-trigger">b hover</span>
            <y-tip ref="fp"><div slot-scope="props">{{ props.data }}</div></y-tip>
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
            <span v-ytip:hovertip.hover class="md-tip-trigger">hover</span>
            <y-tip ref="hovertip">hover tip</y-tip>
        </div>
        <div class="md-box">
            <y-button @click="disable = !disable">
                {{ disable ? '启用' : '禁用' }}tip
            </y-button>
            <span v-ytip.hover.delay="{triggerName: 'hoverdtip', disable: disable}" class="md-tip-trigger">hover delay</span>
            <y-tip ref="hoverdtip">hover delay tip</y-tip>
        </div>
        <div class="md-box">
            <span v-ytip:clicktip.click class="md-tip-trigger">click</span>
            <y-tip ref="clicktip">click tip</y-tip>
        </div>
        <div class="md-box">
            <span v-ytip:rclicktip.rightClick class="md-tip-trigger">right click</span>
            <y-tip ref="rclicktip">right click tip</y-tip>
        </div>
        <div class="md-box">
            <y-button @click="trigger" status="primary">trigger</y-button>
            <span v-ytip:manual.manual class="md-tip-trigger">manual</span>
            <y-tip ref="manual">manual tip</y-tip>
        </div>
        <div class="md-box">
            <span v-ytip:show.show class="md-tip-trigger">show</span>
            <y-tip ref="show">show tip</y-tip>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                disable: false,
                tipStatus: false
            };
        },
        methods: {
            trigger() {
                if (!this.tipStatus) {
                    this.$refs.manual.showTip();
                } else {
                    this.$refs.manual.hideTip();
                }
                this.tipStatus = !this.tipStatus;
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
            <span v-ytip:hovertipl.hover class="md-tip-trigger">left-start hover</span>
            <y-tip ref="hovertipl" placement="left-start">left-start hover tip</y-tip>
        </div>
        <div class="md-box">
            <span v-ytip:hovertipp.show class="md-tip-trigger">priority trigger</span>
            <y-tip ref="hovertipp" placement="right-middle"  :priority="['right-middle', 'top-middle', 'bottom-start', 'left-middle']">priority show tip</y-tip>
        </div>
        <div class="md-box">
            <y-input v-model="tipContent" style="width:400px" />
        </div>
        <div class="md-box">
            <span v-ytip:hovertippp.show class="md-tip-trigger">content change trigger</span>
            <y-tip ref="hovertippp" placement="right-end">{{ tipContent }}</y-tip>
        </div>
    </div>
</template>
```
:::

### 属性

| 参数      | 说明                             | 类型      | 可选值       | 默认值 |
| -------- | -------------------------------- | -------- | ----------- | ----- |
| clazz   | tip自定义类名 | string    | - | '' |
| placement     | tip位置  | string   | left-start, left-middle, left-end, right-start, right-middle, right-end, top-start, top-middle, top-end, bottom-start, bottom-middle, bottom-end | top-middle |
| priority  | tip位置适配优先级  | array   | 同placement  | [] |
| kind | tip大小类型   | string   | tiny, large       | tiny |
