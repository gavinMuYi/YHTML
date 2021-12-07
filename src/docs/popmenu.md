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

### 自定义配置

::: demo
```html
<template>
    <div>
        <div class="md-box">
            自定义项数：
        </div>
        <div class="md-box">
            <y-pagination :total="120" :index="2" :count-options="[50, 100]" />
        </div>
        <div class="md-box">
            自定义页数上限：
        </div>
        <div class="md-box">
            <y-pagination :total="120" :index="1" :visible-page-count="3" />
        </div>
        <div class="md-box">
            默认项数：
        </div>
        <div class="md-box">
            <y-pagination :total="120" :index="1" :count="30" />
        </div>
    </div>
</template>
```
:::

### 属性

| 参数      | 说明                             | 类型      | 可选值       | 默认值 |
| -------- | -------------------------------- | -------- | ----------- | ----- |
| total   | 项数 | number    | - | 0 |
| index     | 当前页码  | number   | - | 1 |
| countOptions  | 页码选项    | array   | -  | [15, 30, 50, 100] |
| count | 当前项数   | number   | -           | 0 |
| visiblePageCount | 显示页码数上限   | number   | -           | 5 |

### 事件

| 事件名称  | 说明                              | 事件参数  |
| -------- | -------------------------------- | -------- |
| change    | 页码 or 项数变化事件 | newValue（count, index） |
