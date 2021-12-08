<script>
    export default {
        data() {
            return {
                options: [
                    {key: 'first', label: '第一项'},
                    {key: 'second', label: '第二项'},
                    {key: 'third', label: '第三项'}
                ],
                options1: [
                    {key: 'first', label: '第一项'},
                    {key: 'second', label: '第二项'},
                    {key: 'third', label: '第三项', disable: true}
                ],
                triggerText: '第二项',
            };
        },
        methods: {
            handleChange(item) {
                this.triggerText = item.label;
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
## Popmenu

### 基本用法

::: demo
```html
<template>
    <div>
        <div class="md-box">
            <div v-ypopmenu:menu.click style="display: inline-block">
                trigger<y-icon name="bell" />
            </div>
            <y-popmenu ref="menu" :options="options" />
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                options: [
                    {key: 'first', label: '第一项'},
                    {key: 'second', label: '第二项'},
                    {key: 'third', label: '第三项'}
                ]
            };
        }
    }
</script>
```
:::

### 回显

::: demo
```html
<template>
    <div>
        <div class="md-box">
            <div v-ypopmenu:menu2.click style="display: inline-block">
                {{ triggerText }}<y-icon name="bell" />
            </div>
            <y-popmenu ref="menu2" :options="options" show-select @change="handleChange" selected="second" />
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                options: [
                    {key: 'first', label: '第一项'},
                    {key: 'second', label: '第二项'},
                    {key: 'third', label: '第三项'}
                ],
                triggerText: '第二项'
            };
        },
        methods: {
            handleChange(item) {
                this.triggerText = item.label;
            }
        }
    }
</script>
```
:::

### 高亮

::: demo
```html
<template>
    <div>
        <div class="md-box">
            <div v-ypopmenu:menu3.click style="display: inline-block">
                trigger<y-icon name="bell" />
            </div>
            <y-popmenu ref="menu3" :options="options" show-select @change="handleChange" highlight="项" />
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                options: [
                    {key: 'first', label: '第一项'},
                    {key: 'second', label: '第二项'},
                    {key: 'third', label: '第三项'}
                ]
            };
        }
    }
</script>
```
:::

### 禁选

::: demo
```html
<template>
    <div>
        <div class="md-box">
            <div v-ypopmenu:menu4.click style="display: inline-block">
                trigger<y-icon name="bell" />
            </div>
            <y-popmenu ref="menu4" :options="options1" show-select @change="handleChange" />
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                options1: [
                    {key: 'first', label: '第一项'},
                    {key: 'second', label: '第二项'},
                    {key: 'third', label: '第三项', disable: true}
                ]
            };
        }
    }
</script>
```
:::
### 属性

| 参数      | 说明                             | 类型      | 可选值       | 默认值 |
| -------- | -------------------------------- | -------- | ----------- | ----- |
| clazz   | 弹窗自定义类名 | string    | - | '' |
| placement     | 弹窗位置  | string   | 见popper | bottom-middle |
| priority  | 弹窗位置适配优先级  | array   | 见popper  | [] |
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
