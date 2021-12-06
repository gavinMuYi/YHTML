<script>
    export default {
        data() {
            return {
            };
        },
        methods: {
            handleClick() {
                alert('YIcon 透传所有原生事件');
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
## Icon

### 基本用法

::: demo
```html
<template>
    <div>
        <div class="md-box">
            <y-icon name="arrow-up" @click="handleClick" />
        </div>
        <div class="md-box">
            <y-icon name="arrow-down" @click="handleClick" />
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
            };
        },
        methods: {
            handleClick() {
                alert('YIcon 透传所有原生事件');
            }
        }
    }
</script>
```
:::

### 使用外链symbol图标

::: demo
```html
<template>
    <div>
        <div class="md-box">
            <y-icon name="#icon-a-anquandai2" remote :style="{width: '20px',height: '20px'}" />
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                status: ['empty', 'all', 'half']
            };
        },
        methods: {
            handleChange(nStatus, index) {
                this.$set(this.status, index, nStatus);
            }
        }
    }
</script>
```
:::

### 属性

| 参数      | 说明                             | 类型      | 可选值       | 默认值 |
| -------- | -------------------------------- | -------- | ----------- | ----- |
| name   | icon名称，项目内的svg-icon文件名，项目需要使用svg-sprite-loader | string    | - | '' |
| remote  | 是否使用外链symbol图标，remote: true时，在模板html中引入外链，name为完整的外链icon名称 | boolean   | - | false |

### 事件

| 事件名称  | 说明                              | 事件参数  |
| -------- | -------------------------------- | -------- |
| nativeEvent    | YIcon 透传所有原生事件 | Event |
