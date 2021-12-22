<script>
    export default {
        data() {
            return {
                config: {
                    basic: {
                        detail: 'this is a toast',
                    },
                    center: {
                        title: 'Center Toast',
                        detail: 'this is a center toast',
                        placement: 'center'
                    },
                    normal: {
                        title: 'Normal Toast',
                        detail: 'this is a normal toast',
                        iconName: 'question',
                        comfirmText: '知道了',
                        placement: 'center',
                        status: 'normal'
                    },
                    success: {
                        title: 'Success Toast',
                        detail: 'this is a success toast',
                        iconName: 'ok',
                        comfirmText: '好的',
                        placement: 'center',
                        status: 'success'
                    },
                    warning: {
                        title: 'Warning Toast',
                        detail: 'this is a warning toast',
                        iconName: 'info',
                        comfirmText: '知道了',
                        placement: 'center',
                        status: 'warning'
                    },
                    error: {
                        title: 'Error Toast',
                        detail: 'this is a error toast',
                        iconName: 'close',
                        comfirmText: '知道了',
                        placement: 'center',
                        status: 'error'
                    }
                }
            };
        },
        methods: {
            handleClick(key) {
                this.$toast(this.config[key]);
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
## Toast

### 基本用法

::: demo
```html
<template>
    <div>
        <y-button @click="handleClick('basic')">Toast</y-button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                config: {
                    basic: {
                        detail: 'this is a toast',
                    }
                }
            };
        },
        methods: {
            handleClick(key) {
                this.$toast(this.config[key]);
            }
        }
    }
</script>
```
:::

### 位置居中

::: demo
```html
<template>
    <div>
        <y-button @click="handleClick('center')">Toast</y-button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                config: {
                    center: {
                        title: 'Center Toast',
                        detail: 'this is a center toast',
                        placement: 'center'
                    }
                }
            };
        },
        methods: {
            handleClick(key) {
                this.$toast(this.config[key]);
            }
        }
    }
</script>
```
:::

### 提示状态

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
            return {
                config: {
                    normal: {
                        title: 'Normal Toast',
                        detail: 'this is a normal toast',
                        iconName: 'question',
                        comfirmText: '知道了',
                        placement: 'center',
                        status: 'normal'
                    },
                    success: {
                        title: 'Success Toast',
                        detail: 'this is a success toast',
                        iconName: 'ok',
                        comfirmText: '好的',
                        placement: 'center',
                        status: 'success'
                    },
                    warning: {
                        title: 'Warning Toast',
                        detail: 'this is a warning toast',
                        iconName: 'info',
                        comfirmText: '知道了',
                        placement: 'center',
                        status: 'warning'
                    },
                    error: {
                        title: 'Error Toast',
                        detail: 'this is a error toast',
                        iconName: 'close',
                        comfirmText: '知道了',
                        placement: 'center',
                        status: 'error'
                    }
                }
            };
        },
        methods: {
            handleClick(key) {
                this.$toast(this.config[key]);
            }
        }
    }
</script>
```
:::

### 方法

| 方法名      | 说明                             | 参数 |
| -------- | -------------------------------- | -------- | ----------- | ----- |
| this.$toast(options)   | 需要手动确认的消息提示 |options: { title, detail, iconName, comfirmText, placement, status } |
