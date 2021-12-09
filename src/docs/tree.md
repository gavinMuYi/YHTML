<script>
    export default {
        data() {
            return {
                selected: [{
                    label: 'item-selected',
                    key: 'selected'
                }],
                options: [{
                    label: 'item-selected',
                    key: 'selected',
                }, {
                    label: 'item-12',
                    key: '32',
                    children: [{
                        label: 'item-414',
                        key: '943'
                    }]
                }, {
                    label: 'item-14',
                    key: '4343'
                }],
                optionse: [{
                    label: 'item-selected',
                    key: 'selected',
                }, {
                    label: 'item-12',
                    key: '32',
                    extend: true,
                    children: [{
                        label: 'item-414',
                        key: '943'
                    }]
                }, {
                    label: 'item-14',
                    key: '4343'
                }],
                optionsd: [{
                    label: 'item-selected',
                    key: 'selected',
                }, {
                    label: 'item-12',
                    key: '32',
                    children: [{
                        label: 'item-414',
                        key: '943'
                    }]
                }, {
                    label: 'item-14',
                    key: '4343',
                    disable: true
                }]
            };
        },
        methods: {
            lazyLoad(index, count, highlight, leaf) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve();
                    }, 1000);
                }).then(() => {
                    let res = leaf ? [] : [{
                        label: 'item-selected',
                        key: 'selected',
                        hasChildren: true
                    }];
                    for (let i = 0; i < 10; i++) {
                        res.push({
                            label: 'item' + Math.floor(Math.random() * 1000),
                            key: 'item' + Math.floor(Math.random() * 1000),
                            hasChildren: true
                        });
                    }
                    return res;
                });
            },
            lazyLoadSingle(index, count, highlight, leaf) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve();
                    }, 1000);
                }).then(() => {
                    let res = leaf ? [] : [{
                        label: 'item-selected',
                        key: 'selected',
                        hasChildren: false
                    }];
                    for (let i = 0; i < 10; i++) {
                        res.push({
                            label: 'item' + Math.floor(Math.random() * 1000),
                            key: 'item' + Math.floor(Math.random() * 1000),
                            hasChildren: true
                        });
                    }
                    return res;
                });
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
## Tree

### 基本用法

::: demo
```html
<template>
    <div>
        <div class="md-box">
            <y-tree :lazy-load="lazyLoad" multiple :value="selected" />
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                selected: [{
                    label: 'item-selected',
                    key: 'selected'
                }]
            };
        },
        methods: {
            lazyLoad(index, count, highlight, leaf) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve();
                    }, 1000);
                }).then(() => {
                    let res = leaf ? [] : [{
                        label: 'item-selected',
                        key: 'selected',
                        hasChildren: true
                    }];
                    for (let i = 0; i < 10; i++) {
                        res.push({
                            label: 'item' + Math.floor(Math.random() * 1000),
                            key: 'item' + Math.floor(Math.random() * 1000),
                            hasChildren: true
                        });
                    }
                    return res;
                });
            },
        }
    }
</script>
```
:::

### 异步请求数据

::: demo
```html
<template>
    <div>
        <div class="md-box">
            多选
        </div>
        <div class="md-box">
            <y-tree :lazy-load="lazyLoad" multiple :value="selected" />
        </div>
        <div class="md-box">
            单选
        </div>
        <div class="md-box">
            <y-tree :lazy-load="lazyLoadSingle" :value="selected" />
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                selected: [{
                    label: 'item-selected',
                    key: 'selected'
                }]
            };
        },
        methods: {
            lazyLoad(index, count, highlight, leaf) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve();
                    }, 1000);
                }).then(() => {
                    let res = leaf ? [] : [{
                        label: 'item-selected',
                        key: 'selected',
                        hasChildren: true
                    }];
                    for (let i = 0; i < 10; i++) {
                        res.push({
                            label: 'item' + Math.floor(Math.random() * 1000),
                            key: 'item' + Math.floor(Math.random() * 1000),
                            hasChildren: true
                        });
                    }
                    return res;
                });
            },
            lazyLoadSingle(index, count, highlight, leaf) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve();
                    }, 1000);
                }).then(() => {
                    let res = leaf ? [] : [{
                        label: 'item-selected',
                        key: 'selected',
                        hasChildren: false
                    }];
                    for (let i = 0; i < 10; i++) {
                        res.push({
                            label: 'item' + Math.floor(Math.random() * 1000),
                            key: 'item' + Math.floor(Math.random() * 1000),
                            hasChildren: true
                        });
                    }
                    return res;
                });
            }
        }
    }
</script>
```
:::

### 同步请求数据

::: demo
```html
<template>
    <div>
        <div class="md-box">
            多选
        </div>
        <div class="md-box">
            <y-tree :options="options" multiple :value="selected" />
        </div>
        <div class="md-box">
            单选
        </div>
        <div class="md-box">
            <y-tree :options="options" :value="selected" />
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                selected: [{
                    label: 'item-selected',
                    key: 'selected'
                }],
                options: [{
                    label: 'item-selected',
                    key: 'selected',
                }, {
                    label: 'item-12',
                    key: '32',
                    children: [{
                        label: 'item-414',
                        key: '943'
                    }]
                }, {
                    label: 'item-14',
                    key: '4343'
                }]
            };
        }
    }
</script>
```
:::

### 默认展开 & 禁用

::: demo
```html
<template>
    <div>
        <div class="md-box">
            默认展开
        </div>
        <div class="md-box">
            <y-tree :options="optionse" multiple :value="selected" />
        </div>
        <div class="md-box">
            禁用
        </div>
        <div class="md-box">
            <y-tree :options="optionsd" :value="selected" />
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                selected: [{
                    label: 'item-selected',
                    key: 'selected'
                }],
                optionse: [{
                    label: 'item-selected',
                    key: 'selected',
                }, {
                    label: 'item-12',
                    key: '32',
                    extend: true,
                    children: [{
                        label: 'item-414',
                        key: '943'
                    }]
                }, {
                    label: 'item-14',
                    key: '4343'
                }],
                optionsd: [{
                    label: 'item-selected',
                    key: 'selected',
                }, {
                    label: 'item-12',
                    key: '32',
                    children: [{
                        label: 'item-414',
                        key: '943'
                    }]
                }, {
                    label: 'item-14',
                    key: '4343',
                    disable: true
                }]
            };
        }
    }
</script>
```
:::

### 过滤

::: demo
```html
<template>
    <div>
        <div class="md-box">
            包含14
        </div>
        <div class="md-box">
            <y-tree :options="options" multiple :value="selected" highlight="14" />
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                selected: [{
                    label: 'item-selected',
                    key: 'selected'
                }],
                options: [{
                    label: 'item-selected',
                    key: 'selected',
                }, {
                    label: 'item-12',
                    key: '32',
                    children: [{
                        label: 'item-414',
                        key: '943'
                    }]
                }, {
                    label: 'item-14',
                    key: '4343'
                }]
            };
        }
    }
</script>
```
:::

### 属性

| 参数      | 说明                             | 类型      | 可选值       | 默认值 |
| -------- | -------------------------------- | -------- | ----------- | ----- |
| searchPlaceholder   | 搜索框文案，有值时展示搜索框 | string    | - | '' |
| placement     | 下拉框位置  | string   | left-start, left-middle, left-end, right-start, right-middle, right-end, top-start, top-middle, top-end, bottom-start, bottom-middle, bottom-end | bottom-start |
| placeholder  | 选择框默认文案    | string   | -           | 请选择 |
| quickSelectAll | 快速全选,异步时需配合allSelected，asyncSelectMode使用，异步全选抛出值为all，且不支持手动逐项取消  | boolean   | -           | false |
| allSelected | 是否已全选，异步数据时使用，true表示全部选择，value传[]   | boolean   | -           | false |
| asyncSelectMode | 异步选择模式配合quickSelectAll使用，true表示全选后抛出'all'   | boolean   | -           | true |
| value | 选中值，推荐保留树结构以应对异步数据回显   | array   | -   | [] |
| options | 同步数据，树结构   | array   | -   | - |
| lazyLoad | 异步请求数据   | function   | -   | (index, count, searchKey, leaf) => {return new Promise(resolve, reject) => {resolve();}).then(() => {return [];});} |
| maps | 数据映射   | object   | -   | {key, label, children, hasChildren, disable, extend, cascade} |
| count | 单次请求数量 | number | - | -1 |
| highlightFilter | 同步数据搜索过滤 | boolean | - | true |
| multiple | 是否多选 | boolean | - | false |
| track | 是否还原整个用户选择轨迹, true表示抛出树结构数据 | boolean | - | true |

### Slot

| Slot名称  | 说明                             |
| -------- | -------------------------------- |
| trigger  | 通过scope slot自定义trigger的显示，props返回选中的项的数据 |
| item  | 通过scope slot自定义选项的显示，props返回该项的数据&层级 |

### 事件

| 事件名称  | 说明                              | 事件参数  |
| -------- | -------------------------------- | -------- |
| confirm    | 提交选择事件 | 'all' or [树结构] |
