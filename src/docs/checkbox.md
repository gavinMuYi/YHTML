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
<style>
.md-box {
    margin-bottom: 20px;
}
.md-box:last-child {
    margin-bottom: 0px;
}
</style>
## Checkbox

### 基本用法

::: demo
```html
<template>
    <div>
        <div class="md-box">
            <y-checkbox label="label checkbox" />
        </div>
        <div class="md-box">
            <y-checkbox>
                <div class="label">slot checkbox</div>
            </y-checkbox>
        </div>
    </div>
</template>
```
:::

### 状态控制

::: demo
```html
<template>
    <div>
        <div class="md-box">
            <y-checkbox :label="status[0] + ' selected'" :status="status[0]" @change="handleChange($event, 0)"/>
        </div>
        <div class="md-box">
            <y-checkbox :label="status[1] + ' selected'" :status="status[1]" @change="handleChange($event, 1)" />
        </div>
        <div class="md-box">
            <y-checkbox :label="status[2] + ' selected'" :status="status[2]" @change="handleChange($event, 2)" />
        </div>
        <div class="md-box">
            <y-checkbox label="disable all selected" status="all" disable />
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
| label   | 文案 | string    | - | '' |
| status     | 状态                        | string   | empty, half, all | empty |
| disable  | 是否禁用    | boolean   | -           | false |

### Slot

| Slot名称  | 说明                             |
| -------- | -------------------------------- |
| default  | 默认的slot，作为多选的内容，优先级高于label |

### 事件

| 事件名称  | 说明                              | 事件参数  |
| -------- | -------------------------------- | -------- |
| change    | 选中状态改变事件 | newStatus（empty, half, all） |
