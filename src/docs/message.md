<script>
    export default {
        data() {
            return {};
        },
        methods: {
            handleClick(status) {
                this.$message[status]('info message')
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
## Message

### 基本用法

::: demo
```html
<template>
    <div>
        <y-button @click="handleClick('error')">Error</y-button>
        <y-button @click="handleClick('warning')">Warning</y-button>
        <y-button @click="handleClick('success')">Success</y-button>
        <y-button @click="handleClick('normal')">Normal</y-button>
    </div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        methods: {
            handleClick(status) {
                this.$message[status]('info message')
            }
        }
    }
</script>
```
:::

### 方法

| 方法名      | 说明                             | 参数 |
| -------- | -------------------------------- | -------- | ----------- | ----- |
| this.$message\[status\]('message')   | status可选success, error, warning, normal |content（string） |
