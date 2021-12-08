<script>
    export default {
        data() {
            return {
            };
        },
        methods: {
            lazyLoad(index, count, highlight, self) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve();
                    }, 1000);
                }).then(() => {
                    let res = [{
                        label: 'item-selected',
                        key: 'selected',
                        hasChildren: true
                    }];
                    res.push({
                        label: 'item' + Math.floor(Math.random() * 1000),
                        key: 'item' + Math.floor(Math.random() * 1000),
                        hasChildren: true
                    });
                    return res;
                });
            },
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
            <y-select :lazy-load="lazyLoad" multiple quick-select-all async-select-mode />
        </div>
    </div>
</template>
```
:::
