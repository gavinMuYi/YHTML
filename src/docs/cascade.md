<script>
    export default {
        data() {
            return {
                options: [{
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
## Cascade

### 基本用法

::: demo
```html
<template>
    <div>
        <div class="md-box">
            <y-select
                :multiple="true" cascade-mode="hover" quick-select-all search-placeholder="请搜索"
                :options="options" />
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                options: [{
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

### 弹窗跟随用法

::: demo
```html
<template>
    <div>
        <div class="md-box">
            <y-select
                :multiple="true" cascade-mode="hover" quick-select-all search-placeholder="请搜索"
                :options="optionsr" cascade-relative />
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
| cascadeRelative   | 子级级联弹窗是否跟随，item.cascade为relative时需置为true | boolean    | - | false |
| cascadeBottom   | 子级级联弹窗跟随时距底部的标准差，与treeSize适配使用 | number    | - | 32 |
| treeSize   | 单个级联弹窗的大小,兜底值[300, 400] | array    | - | [] |
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
| accordion | 手风琴模式，同级别只能展开一项 | boolean | - | false |

### Slot

| Slot名称  | 说明                             |
| -------- | -------------------------------- |
| trigger  | 通过scope slot自定义trigger的显示，props返回选中的项的数据 |
| item  | 通过scope slot自定义选项的显示，props返回该项的数据&层级 |

### 事件

| 事件名称  | 说明                              | 事件参数  |
| -------- | -------------------------------- | -------- |
| confirm    | 提交选择事件 | 'all' or [树结构] |
