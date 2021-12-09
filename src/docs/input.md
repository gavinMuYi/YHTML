<script>
    export default {
        data() {
            return {
                value: '',
                quickClearVal: 'quickClear',
                regexp: /^\d*\.?\d{0,3}$/,
                regVal: '3143'
            };
        },
        methods: {
            handlerE(e, val) {
                this.value = val;
            },
            handler(val) {
                this.value = val;
            },
            quickClear(val) {
                this.quickClearVal = val;
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
## Input

### 基本用法

::: demo
```html
<template>
    <div>
        <div class="md-box">
            输入值: {{ value }}
        </div>
        <div class="md-box">
            <y-input @blur="handlerE" @focus="handlerE" @change="handler" @input="handler" />
        </div>
        <div class="md-box">
            <y-input v-model="value" />
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        methods: {
            handlerE(e, val) {
                this.value = val;
            },
            handler(val) {
                this.value = val;
            }
        }
    }
</script>
```
:::

### 类型与大小

::: demo
```html
<template>
    <div>
        <div class="md-box">
            <y-input size="min" value="min input" />
        </div>
        <div class="md-box">
            <y-input size="medium" value="medium input" />
        </div>
        <div class="md-box">
            <y-input size="max" value="max input" />
        </div>
        <div class="md-box">
            <y-input type="password" value="password" />
        </div>
    </div>
</template>
```
:::

### 交互配置

::: demo
```html
<template>
    <div>
        <div class="md-box">
           禁用：<y-input disable value="disable input" />
        </div>
        <div class="md-box">
            自动聚焦：<y-input autofocus value="autofocus" />
        </div>
        <div class="md-box">
            快速清空：<y-input quick-clear :value="quickClearVal" @change="quickClear" />
        </div>
        <div class="md-box">
            清空值的变化：{{ quickClearVal }}
        </div>
        <div class="md-box">
            左侧icon：
            <y-input quick-clear left-icon="search" />
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                quickClearVal: 'quickClear'
            };
        },
        methods: {
            quickClear(val) {
                this.quickClearVal = val;
            } 
        }
    }
</script>
```
:::

### 规则校验

::: demo
```html
<template>
    <div>
        <div class="md-box">
            输入值: {{ regVal }}
        </div>
        <div class="md-box">
            仅允许小数点后三位：<y-input :reg="regexp" v-model="regVal" />
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                regexp: /^\d*\.?\d{0,3}$/,
                regVal: '3143'
            };
        }
    }
</script>
```
:::

### 属性

| 参数      | 说明                             | 类型      | 可选值       | 默认值 |
| -------- | -------------------------------- | -------- | ----------- | ----- |
| value   | 绑定值 | string    | - | '' |
| size     | 输入框的大小                        | string   | min, medium, max | medium |
| type  | 输入框类型    | string   | text, password           | text |
| placeholder | 输入框占位符    | string   | -           | '' |
| autofocus | 自动聚焦   | boolean   | -           | false |
| reg | 自定义校验规则   | RegExp   | -           | - |
| leftIcon | 左侧图标   | string   | -           | '' |
| quickClear | 快速清空   | boolean   | -           | false |
| disable | 是否处于disabled状态   | boolean   | -           | false |

### 事件

| 事件名称  | 说明                              | 事件参数  |
| -------- | -------------------------------- | -------- |
| input    | 输入事件 | value |
| focus    | 获取焦点事件 | Event, value |
| input    | 失去焦点事件 | Event, value |
| change    | 绑定值变化事件 | value |
