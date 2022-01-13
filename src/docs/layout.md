<script>
    export default {
        data() {
            return {
            };
        },
        methods: {
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
.md-content-1 {
    height: 50px;
    border-radius: 10px;
    background: #dbf4f0;
    line-height: 50px;
    text-align: center;
}
.md-content-2 {
    height: 50px;
    border-radius: 10px;
    background: #f7f7f7;
    line-height: 50px;
    text-align: center;
}
.md-out {
    height: 100px;
    line-height: 100px;
}
.md-in-1 {
    background: #496866;
    color: #ffffff;
}
.md-in-2 {
    background: #18b9ac;
    color: #ffffff;
}
</style>
## Layout

### 基本用法

::: demo
```html
<template>
    <y-row>
        <y-col :span="5">
            <div class="md-content-1">5</div>
        </y-col>
        <y-col :span="7">
            <div class="md-content-2">7</div>
        </y-col>
        <y-col :span="4">
            <div class="md-content-1">4</div>
        </y-col>
        <y-col :span="8">
            <div class="md-content-2">8</div>
        </y-col>
        <y-col :span="2">
            <div class="md-content-1">2</div>
        </y-col>
        <y-col :span="3">
            <div class="md-content-2">3</div>
        </y-col>
    </y-row>
</template>
```
:::

### 定宽布局

::: demo
```html
<template>
    <y-row>
        <y-col :fixed-width="200">
            <div class="md-content-1">200px</div>
        </y-col>
        <y-col :span="7">
            <div class="md-content-2">7</div>
        </y-col>
        <y-col :span="3">
            <div class="md-content-1">3</div>
        </y-col>
    </y-row>
</template>
```
:::

### gutter

::: demo
```html
<template>
    <y-row :gutter="5">
        <y-col :span="2">
            <div class="md-content-1">2</div>
        </y-col>
        <y-col :span="4">
            <div class="md-content-2">4</div>
        </y-col>
        <y-col :span="8">
            <div class="md-content-1">8</div>
        </y-col>
        <y-col :span="5">
            <div class="md-content-2">5</div>
        </y-col>
    </y-row>
</template>
```
:::

### 偏移量

::: demo
```html
<template>
    <y-row>
        <y-col :span="5" :left-span="1">
            <div class="md-content-1">5</div>
        </y-col>
        <y-col :span="2">
            <div class="md-content-2">2</div>
        </y-col>
        <y-col :span="8" :left-span="2" :right-span="1">
            <div class="md-content-1">8</div>
        </y-col>
        <y-col :span="3" :right-span="2">
            <div class="md-content-2">3</div>
        </y-col>
    </y-row>
</template>
```
:::

### 嵌套布局

::: demo
```html
<template>
    <div class="md-box">
        <y-row>
            <y-col :span="4">
                <div class="md-content-1 md-out">4</div>
            </y-col>
            <y-col :span="8">
                <div class="md-content-2 md-out">
                    <y-row>
                        <y-col :span="5" :left-span="1">
                            <div class="md-content-1 md-in-1">5</div>
                        </y-col>
                        <y-col :span="2">
                            <div class="md-content-2 md-in-2">2</div>
                        </y-col>
                        <y-col :span="8" :left-span="2" :right-span="1">
                            <div class="md-content-1 md-in-1">8</div>
                        </y-col>
                        <y-col :span="3" :right-span="2">
                            <div class="md-content-2 md-in-2">3</div>
                        </y-col>
                    </y-row>
                </div>
            </y-col>
            <y-col :span="3">
                <div class="md-content-1 md-out">3</div>
            </y-col>
        </y-row>
    </div>
    <div class="md-box">
        <y-row>
            <y-col :span="1">
                <div class="md-content-1 md-out">1</div>
            </y-col>
            <y-col :span="10">
                <div class="md-content-2 md-out">
                    <y-row :gutter="5" align-items="top">
                        <y-col :span="20" :left-span="1">
                            <div class="md-content-1 md-in-1">20</div>
                        </y-col>
                        <y-col :span="3" :right-span="2">
                            <div class="md-content-2 md-in-2">3</div>
                        </y-col>
                    </y-row>
                </div>
            </y-col>
            <y-col :span="2">
                <div class="md-content-1 md-out">2</div>
            </y-col>
        </y-row>
    </div>
</template>
```
:::

### row属性

| 参数      | 说明                             | 类型      | 可选值       | 默认值 |
| -------- | -------------------------------- | -------- | ----------- | ----- |
| gutter   | 列间隔（px） | number    | - | 0 |
| alignItems     | 内容纵向布局   | string   | top, center, bottom | center |

### col属性

| 参数      | 说明                             | 类型      | 可选值       | 默认值 |
| -------- | -------------------------------- | -------- | ----------- | ----- |
| span   | 宽度占比 | number    | - | 0 |
| leftSpan     | 左偏移比例  | number    | - | 0 |
| rightSpan  | 右偏移比例  | number    | - | 0 |
| fixedWidth   | 宽度(px) | number    | - | null |

### Slot

| Slot名称  | 说明                             |
| -------- | -------------------------------- |
| default  | 默认的slot，作为行组件 / 列组件的内容 |

