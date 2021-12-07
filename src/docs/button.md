<script>
    export default {
        data() {
            return {};
        },
        methods: {
            handleClick() {
                alert('按钮点击');
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
## Button

### 基本用法

::: demo
```html
<template>
    <y-button @click="handleClick">Button</y-button>
</template>
<script>
    export default {
        data() {
            return {};
        },
        methods: {
            handleClick() {
                alert('按钮点击');
            }
        }
    }
</script>
```
:::

### 状态与大小

::: demo
```html
<template>
    <div>
        <div class="md-box">
            <y-button>Default</y-button>
            <y-button status="primary">Primary</y-button>
            <y-button status="warning">Warning</y-button>
            <y-button status="error">Error</y-button>
        </div>
        <div class="md-box">
            <y-button size="min">Min</y-button>
            <y-button>Medium</y-button>
            <y-button size="max">Max</y-button>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {};
        }
    }
</script>
```
:::

### 按钮状态

::: demo
```html
<template>
    <div>
        <y-button loading>Loading</y-button>
        <y-button disable>Disable</y-button>
    </div>
</template>
<script>
    export default {
        data() {
            return {};
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
