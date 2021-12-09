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
## Select

### 基本用法

::: demo
```html
<template>
    <div>
        <div class="md-box">
            <y-select :lazy-load="lazyLoad" multiple quick-select-all async-select-mode :value="selected" />
        </div>
        <div class="md-box">
            <y-select :lazy-load="lazyLoad" multiple quick-select-all async-select-mode :value="selected" search-placeholder="请搜索" />
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
            <y-select :lazy-load="lazyLoad" multiple quick-select-all async-select-mode :value="selected" />
        </div>
        <div class="md-box">
            单选
        </div>
        <div class="md-box">
            <y-select :lazy-load="lazyLoadSingle" :value="selected" />
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
            <y-select :options="options" multiple quick-select-all async-select-mode :value="selected" />
        </div>
        <div class="md-box">
            单选
        </div>
        <div class="md-box">
            <y-select :options="options" :value="selected" />
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
