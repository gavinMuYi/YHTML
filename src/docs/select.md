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
