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
                optionsa: [{
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
                    label: 'item-5',
                    key: '3334',
                    children: [{
                        label: 'item-4',
                        key: '94313'
                    }]
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
                }],
                optionsc: [{
                    label: 'item-selected',
                    key: 'selected',
                }, {
                    label: 'item-12',
                    key: '32',
                    cascade: 'fixed',
                    children: [{
                        label: 'item-414',
                        key: '943'
                    }]
                }, {
                    label: 'item-14',
                    key: '4343'
                }],
                optionsr: [{
                    label: 'item-selected',
                    key: 'selected',
                }, {
                    label: 'item-12',
                    key: '32',
                    cascade: 'relative',
                    children: [{
                        label: 'item-414',
                        key: '943'
                    }, {
                        label: 'item-44',
                        key: '43',
                        cascade: 'relative',
                        children: [{
                        label: 'item-74',
                        key: '213'
                        }]
                    }]
                }, {
                    label: 'item-14',
                    key: '4343'
                }, {
                    label: 'item-15',
                    key: '4sv3'
                }, {
                    label: 'item-14w',
                    key: '434vsrw3'
                }, {
                    label: 'item-1y4',
                    key: '43rw43'
                }, {
                    label: 'item-n14',
                    key: '434gf3'
                }, {
                    label: 'item-1t4',
                    key: '43nj43'
                }, {
                    label: 'item-14ht',
                    key: '434y3'
                }, {
                    label: 'item-1net4',
                    key: '43yh43'
                }, {
                    label: 'item-1ed4',
                    key: '43gn43'
                }, {
                    label: 'item-1je4',
                    key: '434n3'
                }, {
                    label: 'item-1ed04',
                    key: '43gni43'
                }, {
                    label: 'item-71je4',
                    key: '4348n3'
                }]
            };
        },
        methods: {
            lazyLoad(index, count, highlight, leaf) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve();
                    }, 200);
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
                    }, 200);
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
                    }, 200);
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
                    }, 200);
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
                    }, 200);
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

### 手风琴模式

::: demo
```html
<template>
    <div>
        <div class="md-box">
            <y-tree :options="optionsa" accordion />
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
                optionsa: [{
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
                    label: 'item-5',
                    key: '3334',
                    children: [{
                        label: 'item-4',
                        key: '94313'
                    }]
                }]
            };
        }
    }
</script>
```
:::

### 级联树

::: demo
```html
<template>
    <div>
        <div class="md-box">
            <y-tree
                :multiple="true" cascade-mode="hover" :tree-size="[300, 400]"
                :options="optionsc" with-border />
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                optionsc: [{
                    label: 'item-selected',
                    key: 'selected',
                }, {
                    label: 'item-12',
                    key: '32',
                    cascade: 'fixed',
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

### 级联跟随树

::: demo
```html
<template>
    <div>
        <div class="md-box">
            <y-tree
                :multiple="true" cascade-mode="hover" :tree-size="[300, 400]"
                :options="optionsr" cascade-relative with-border />
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                optionsr: [{
                    label: 'item-selected',
                    key: 'selected',
                }, {
                    label: 'item-12',
                    key: '32',
                    cascade: 'relative',
                    children: [{
                        label: 'item-414',
                        key: '943'
                    }, {
                        label: 'item-44',
                        key: '43',
                        cascade: 'relative',
                        children: [{
                        label: 'item-74',
                        key: '213'
                        }]
                    }]
                }, {
                    label: 'item-14',
                    key: '4343'
                }, {
                    label: 'item-15',
                    key: '4sv3'
                }, {
                    label: 'item-14w',
                    key: '434vsrw3'
                }, {
                    label: 'item-1y4',
                    key: '43rw43'
                }, {
                    label: 'item-n14',
                    key: '434gf3'
                }, {
                    label: 'item-1t4',
                    key: '43nj43'
                }, {
                    label: 'item-14ht',
                    key: '434y3'
                }, {
                    label: 'item-1net4',
                    key: '43yh43'
                }, {
                    label: 'item-1ed4',
                    key: '43gn43'
                }, {
                    label: 'item-1je4',
                    key: '434n3'
                }, {
                    label: 'item-1ed04',
                    key: '43gni43'
                }, {
                    label: 'item-71je4',
                    key: '4348n3'
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
| cascadeMode   | 级联触发模式,必填 | string    | hover, click | '' |
| item.cascade   | 每项数据若子级需级联则需包含该字段 | string    | fixed, relative | '' |
| cascadeRelative   | 子级级联树是否跟随，item.cascade为relative时需置为true | boolean    | - | false |
| cascadeBottom   | 子级级联树跟随时距底部的标准差，与treeSize适配使用 | number    | - | 32 |
| treeSize   | 单个级联子树的大小,必填，兜底宽度300，推荐[300, 400],必填 | array    | - | [] |
| value | 选中值，推荐保留树结构以应对异步数据回显   | array   | -   | [] |
| options | 同步数据，树结构   | array   | -   | - |
| lazyLoad | 异步请求数据   | function   | -   | (index, count, searchKey, leaf) => {return new Promise(resolve, reject) => {resolve();}).then(() => {return [];});} |
| maps | 数据映射   | object   | -   | {key, label, children, hasChildren, disable, extend, cascade} |
| count | 单次请求数量 | number | - | -1 |
| highlightFilter | 同步数据搜索过滤 | boolean | - | true |
| highlight | 根据值过滤同步数据并高亮 | string | - | '' |
| multiple | 是否多选 | boolean | - | false |
| track | 是否还原整个用户选择轨迹, true表示抛出树结构数据 | boolean | - | true |
| accordion | 手风琴模式，同级别只能展开一项 | boolean | - | false |
| withBorder | 树是否显示边框 | boolean | - | false |

### Slot

| Slot名称  | 说明                             |
| -------- | -------------------------------- |
| trigger  | 通过scope slot自定义trigger的显示，props返回选中的项的数据 |
| item  | 通过scope slot自定义选项的显示，props返回该项的数据&层级 |

### 事件

| 事件名称  | 说明                              | 事件参数  |
| -------- | -------------------------------- | -------- |
| confirm    | 提交选择事件 | 'all' or [树结构] |
