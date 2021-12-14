<script>
    export default {
        data() {
            return {
                unit: {
                    m: ' 万元',
                    all: ' 千斤'
                },
                columnConfigSort: [{
                    key: 'r',
                    label: '区域'
                }, {
                    key: 'm',
                    label: '利润'
                }, {
                    key: 'all',
                    label: '产量',
                    sortable: true
                }],
                columnConfigFix: [{
                    key: 'r',
                    label: '区域',
                    fixed: 'left',
                    width: '200px'
                }, {
                    key: 'area',
                    label: '所属地区',
                    width: '300px'
                }, {
                    key: 'p',
                    label: '所属省份',
                    width: '300px'
                }, {
                    key: 'm',
                    label: '利润',
                    width: '300px'
                }, {
                    key: 'all',
                    label: '产量',
                    width: '300px'
                }, {
                    key: 'id',
                    label: '区域编号',
                    fixed: 'right',
                    width: '200px'
                }],
                columnConfig: [{
                    key: 'r',
                    label: '区域'
                }, {
                    key: 'm',
                    label: '利润'
                }, {
                    key: 'all',
                    label: '产量'
                }],
                options: [{
                    area: '东北',
                    p: '东北',
                    r: '东北',
                    m: 41354,
                    all: 4334434,
                    id: 3286,
                    children: [{
                        area: '东北',
                        p: '吉林',
                        r: '吉林',
                        m: 4234,
                        all: 42334,
                        id: 3439672,
                        children: [{
                            area: '东北',
                            p: '吉林',
                            r: 'A区',
                            m: 534,
                            all: 3445,
                            id: 8098382,
                        }, {
                            area: '东北',
                            p: '吉林',
                            r: 'B区',
                            m: 343,
                            all: 4234,
                            id: 69056,
                        }]
                    }, {
                        area: '东北',
                        p: '辽宁',
                        r: '辽宁',
                        m: 3244,
                        all: 23442,
                        id: 754086,
                        children: [{
                            area: '东北',
                            p: '辽宁',
                            r: 'A区',
                            m: 432,
                            all: 4242,
                            id: 54903,
                        }, {
                            area: '东北',
                            p: '辽宁',
                            r: 'B区',
                            m: 423,
                            all: 3453,
                            id: 3667845,
                        }, {
                            area: '东北',
                            p: '辽宁',
                            r: 'C区',
                            m: 435,
                            all: 5243,
                            id: 859676,
                        }]
                    }, {
                        area: '东北',
                        p: '黑龙江',
                        r: '黑龙江',
                        m: 3434,
                        all: 53665,
                        id: 795786,
                        children: [{
                            area: '东北',
                            p: '黑龙江',
                            r: 'A区',
                            m: 535,
                            all: 5455,
                            id: 740798
                        }, {
                            area: '东北',
                            p: '黑龙江',
                            r: 'B区',
                            m: 455,
                            all: 6456,
                            id: 340963
                        }]
                    }]
                }, {
                    area: '西南',
                    p: '西南',
                    r: '西南',
                    m: 41354,
                    all: 4334434,
                    id: 329578,
                    children: [{
                        area: '西南',
                        p: '四川',
                        r: '四川',
                        m: 4234,
                        all: 42334,
                        id: 340687532,
                        children: [{
                            area: '西南',
                            p: '四川',
                            r: 'A区',
                            m: 534,
                            all: 3445,
                            id: 389682,
                        }, {
                            area: '西南',
                            p: '四川',
                            r: 'B区',
                            m: 343,
                            all: 4234,
                            id: 64856,
                        }]
                    }, {
                        area: '西南',
                        p: '贵州',
                        r: '贵州',
                        m: 3244,
                        all: 23442,
                        id: 7509546,
                        children: [{
                            area: '西南',
                            p: '贵州',
                            r: 'A区',
                            m: 432,
                            all: 4242,
                            id: 54093,
                        }, {
                            area: '西南',
                            p: '贵州',
                            r: 'B区',
                            m: 423,
                            all: 3453,
                            id: 309645,
                        }, {
                            area: '西南',
                            p: '贵州',
                            r: 'C区',
                            m: 435,
                            all: 5243,
                            id: 855896,
                        }]
                    }, {
                        area: '西南',
                        p: '云南',
                        r: '云南',
                        m: 3434,
                        all: 53665,
                        id: 7086,
                        children: [{
                            area: '西南',
                            p: '云南',
                            r: 'A区',
                            m: 535,
                            all: 5455,
                            id: 70894
                        }, {
                            area: '西南',
                            p: '云南',
                            r: 'B区',
                            m: 455,
                            all: 6456,
                            id: 340983
                        }]
                    }]
                }, {
                    area: '东南',
                    p: '东南',
                    r: '东南',
                    m: 41354,
                    all: 4334434,
                    id: 36892,
                    children: [{
                        area: '东南',
                        p: '广东',
                        r: '广东',
                        m: 4234,
                        all: 42334,
                        id: 3490632,
                        children: [{
                            area: '东南',
                            p: '广东',
                            r: 'A区',
                            m: 534,
                            all: 3445,
                            id: 380962,
                        }, {
                            area: '东南',
                            p: '广东',
                            r: 'B区',
                            m: 343,
                            all: 4234,
                            id: 650966,
                        }]
                    }, {
                        area: '东南',
                        p: '海南',
                        r: '海南',
                        m: 3244,
                        all: 23442,
                        id: 7590646,
                        children: [{
                            area: '东南',
                            p: '海南',
                            r: 'A区',
                            m: 432,
                            all: 4242,
                            id: 585943,
                        }, {
                            area: '东南',
                            p: '海南',
                            r: 'B区',
                            m: 423,
                            all: 3453,
                            id: 365645,
                        }, {
                            area: '东南',
                            p: '海南',
                            r: 'C区',
                            m: 435,
                            all: 5243,
                            id: 8746556,
                        }]
                    }, {
                        area: '东南',
                        p: '福建',
                        r: '福建',
                        m: 3434,
                        all: 53665,
                        id: 6354376,
                        children: [{
                            area: '东南',
                            p: '福建',
                            r: 'A区',
                            m: 535,
                            all: 5455,
                            id: 6374
                        }, {
                            area: '东南',
                            p: '福建',
                            r: 'B区',
                            m: 455,
                            all: 6456,
                            id: 3432365
                        }]
                    }]
                }, {
                    area: '西北',
                    p: '西北',
                    r: '西北',
                    m: 41354,
                    all: 4334434,
                    id: 3652,
                    children: [{
                        area: '西北',
                        p: '宁夏',
                        r: '宁夏',
                        m: 4234,
                        all: 42334,
                        id: 3424532,
                        children: [{
                            area: '西北',
                            p: '宁夏',
                            r: 'A区',
                            m: 534,
                            all: 3445,
                            id: 3885622,
                        }, {
                            area: '西北',
                            p: '宁夏',
                            r: 'B区',
                            m: 343,
                            all: 4234,
                            id: 65856,
                        }]
                    }, {
                        area: '西北',
                        p: '甘肃',
                        r: '甘肃',
                        m: 3244,
                        all: 23442,
                        id: 75856746,
                        children: [{
                            area: '西北',
                            p: '甘肃',
                            r: 'A区',
                            m: 432,
                            all: 4242,
                            id: 543657,
                        }, {
                            area: '西北',
                            p: '甘肃',
                            r: 'B区',
                            m: 423,
                            all: 3453,
                            id: 364965,
                        }, {
                            area: '西北',
                            p: '甘肃',
                            r: 'C区',
                            m: 435,
                            all: 5243,
                            id: 845656,
                        }]
                    }]
                }, {
                    area: '中部',
                    p: '中部',
                    r: '中部',
                    m: 41354,
                    all: 4334434,
                    id: 372,
                    children: [{
                        area: '中部',
                        p: '江苏',
                        r: '江苏',
                        m: 4234,
                        all: 42334,
                        id: 343462,
                        children: [{
                            area: '中部',
                            p: '江苏',
                            r: 'A区',
                            m: 534,
                            all: 3445,
                            id: 37682,
                        }, {
                            area: '中部',
                            p: '江苏',
                            r: 'B区',
                            m: 343,
                            all: 4234,
                            id: 646756,
                        }]
                    }, {
                        area: '中部',
                        p: '安徽',
                        r: '安徽',
                        m: 3244,
                        all: 23442,
                        id: 759646,
                        children: [{
                            area: '中部',
                            p: '安徽',
                            r: 'A区',
                            m: 432,
                            all: 4242,
                            id: 54743,
                        }, {
                            area: '中部',
                            p: '安徽',
                            r: 'B区',
                            m: 423,
                            all: 3453,
                            id: 368745,
                        }, {
                            area: '中部',
                            p: '安徽',
                            r: 'C区',
                            m: 435,
                            all: 5243,
                            id: 87456,
                        }]
                    }, {
                        area: '中部',
                        p: '河南',
                        r: '河南',
                        m: 3434,
                        all: 53665,
                        id: 768746,
                        children: [{
                            area: '中部',
                            p: '河南',
                            r: 'A区',
                            m: 535,
                            all: 5455,
                            id: 74764
                        }, {
                            area: '中部',
                            p: '河南',
                            r: 'B区',
                            m: 455,
                            all: 6456,
                            id: 348673
                        }]
                    }]
                }, {
                    area: '自治区',
                    p: '自治区',
                    r: '自治区',
                    m: 41354,
                    all: 4334434,
                    id: 328464,
                    children: [{
                        area: '自治区',
                        p: '内蒙古',
                        r: '内蒙古',
                        m: 4234,
                        all: 42334,
                        id: 34867322,
                        children: [{
                            area: '自治区',
                            p: '内蒙古',
                            r: 'A区',
                            m: 534,
                            all: 3445,
                            id: 38856782,
                        }, {
                            area: '自治区',
                            p: '内蒙古',
                            r: 'B区',
                            m: 343,
                            all: 4234,
                            id: 65567856,
                        }]
                    }, {
                        area: '自治区',
                        p: '西藏',
                        r: '西藏',
                        m: 3244,
                        all: 23442,
                        id: 754856786,
                        children: [{
                            area: '自治区',
                            p: '西藏',
                            r: 'A区',
                            m: 432,
                            all: 4242,
                            id: 5467883,
                        }, {
                            area: '自治区',
                            p: '西藏',
                            r: 'B区',
                            m: 423,
                            all: 3453,
                            id: 53645,
                        }, {
                            area: '自治区',
                            p: '西藏',
                            r: 'C区',
                            m: 435,
                            all: 5243,
                            id: 85096,
                        }]
                    }, {
                        area: '自治区',
                        p: '新疆',
                        r: '新疆',
                        m: 3434,
                        all: 53665,
                        id: 72346,
                        children: [{
                            area: '自治区',
                            p: '新疆',
                            r: 'A区',
                            m: 535,
                            all: 5455,
                            id: 6574
                        }, {
                            area: '自治区',
                            p: '新疆',
                            r: 'B区',
                            m: 455,
                            all: 6456,
                            id: 74343
                        }]
                    }]
                }]
            };
        },
        computed: {
            flatOptions() {
                let flat = (arr) => {
                    let res = [];
                    arr.forEach(item => {
                        let {children, ...orgs} = item;
                        res.push(children ? orgs : {
                            ...orgs,
                            r: orgs.p + '-' + orgs.r
                        });
                        if (children && children.length) {
                            res = res.concat(flat(children));
                        }
                    });
                    return res;
                };
                return flat(this.options);
            }
        },
        methods: {
            compare(a, b) {
                return (a.m / a.all) > (b.m / b.all) ? 1 : -1;
            },
            setRowClass(rowData, index) {
                if (rowData.m < 400) {
                    return 'customer-row-warning';
                }
            },
            lazyLoad(leaf, index, count, sort) {
                let getItem = (arr, item) => {
                    let answer = null;
                    arr.forEach(i => {
                        if (i.all === item.all) {
                            answer = i.children.map(k => {
                                let { children, ...les } = k;
                                if (children) {
                                    les.hasChildren = true;
                                }
                                return les;
                            });
                        } else {
                            if (i.children) {
                                !answer && (answer = getItem(i.children, item, answer));
                            }
                        }
                    });
                    return answer;
                };
                if (leaf) {
                    let answer = getItem(this.options, leaf);
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve();
                        }, 1000);
                    }).then(() => {
                        return answer;
                    });
                } else {
                    return new Promise((resolve, reject) => {
                        resolve();
                    }).then(() => {
                        return {
                            options: this.options.map(item => {
                                let { children, ...les } = item;
                                if (children) {
                                    les.hasChildren = true;
                                }
                                return les;
                            }),
                            total: 1
                        };
                    });
                }
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
.md-box .customer-row-warning {
    background: #fb9f9f;
}
.customer-row3 {
    padding: 20px;
}
</style>
## Table

```info
固定table列时，table组件只在各表中渲染需要显示的列，通过在各table下的挂载object对象并监听其resize事件，实现时时同步各表行高。从而做到在解决业界常见的各表各行高度不一致问题的基础上提升渲染性能。在大数据渲染的场景下同比业界常见table渲染性能提升65%-70%，内存消耗减少55%-65%。
```

### 基本用法

::: demo 
```html
<template>
    <y-table title="中国各地区粮食产量表" :options="flatOptions" :column-config="columnConfig" />
</template>
<script>
    export default {
        data() {
            return {
                columnConfig: [{
                    key: 'r',
                    label: '区域'
                }, {
                    key: 'm',
                    label: '利润'
                }, {
                    key: 'all',
                    label: '产量'
                }],
                flatOptions: [{
                    r: '东北',
                    m: 41354,
                    all: 4334434,
                    id: 3286
                }...]
            };
        }
    }
</script>
```
:::

### 带斑马纹表格

::: demo 
```html
<template>
    <y-table title="中国各地区粮食产量表" :options="flatOptions" :column-config="columnConfig" stripe />
</template>
<script>
    export default {
        data() {
            return {
                columnConfig: [{
                    key: 'r',
                    label: '区域'
                }, {
                    key: 'm',
                    label: '利润'
                }, {
                    key: 'all',
                    label: '产量'
                }],
                flatOptions: [{
                    r: '东北',
                    m: 41354,
                    all: 4334434,
                    id: 3286
                }...]
            };
        }
    }
</script>
```
:::

### 设置单行状态表格

::: demo 
```html
<template>
    <div class="md-box">
        <y-table title="中国各地区粮食产量指标完成进度表" :options="flatOptions" :column-config="columnConfig"  :set-row-class="setRowClass" />
    </div>
</template>
<script>
    export default {
        data() {
            return {
                columnConfig: [{
                    key: 'r',
                    label: '区域'
                }, {
                    key: 'm',
                    label: '利润'
                }, {
                    key: 'all',
                    label: '产量'
                }],
                flatOptions: [{
                    r: '东北',
                    m: 41354,
                    all: 4334434,
                    id: 3286
                }...]
            };
        },
        methods: {
            setRowClass(rowData, index) {
                if (rowData.m < 400) {
                    return 'customer-row-warning';
                }
            }
        }
    }
</script>
```
:::

### 自定义单元格表格

::: demo 
```html
<template>
    <y-table title="中国各地区粮食产量表" :options="flatOptions" :column-config="columnConfig">
        <y-table-column
            v-for="column in columnConfig"
            :key="column.id" :label="column.label" :column-key="column.key">
            <div slot-scope="props" slot="cell">
                {{ props[column.key] + (unit[column.key] || '') }}
            </div>
        </y-table-column>
    </y-table>
</template>
<script>
    export default {
        data() {
            return {
                unit: {
                    m: ' 万元',
                    all: ' 千斤'
                },
                columnConfig: [{
                    key: 'r',
                    label: '区域'
                }, {
                    key: 'm',
                    label: '利润'
                }, {
                    key: 'all',
                    label: '产量'
                }],
                flatOptions: [{
                    r: '东北',
                    m: 41354,
                    all: 4334434,
                    id: 3286
                }...]
            };
        }
    }
</script>
```
:::

### 自定义表格行

::: demo 
```html
<template>
    <y-table title="中国各地区粮食产量表" :options="options" :column-config="columnConfig">
        <y-table-column
            v-for="column in columnConfig"
            :key="column.id" :label="column.label" :column-key="column.key">
        </y-table-column>
        <div slot-scope="props" slot="row3">
            <div class="customer-row3">
                <div>{{ props.rowData.p }}下辖区域的具体情况：</div>
                <div>区名：{{props.rowData.r }}</div>
                <div>利润：{{props.rowData.m }}</div>
                <div>产量：{{props.rowData.all }}</div>
            </div>
        </div>
    </y-table>
</template>
<script>
    export default {
        data() {
            return {
                unit: {
                    m: ' 万元',
                    all: ' 千斤'
                },
                columnConfig: [{
                    key: 'r',
                    label: '区域'
                }, {
                    key: 'm',
                    label: '利润'
                }, {
                    key: 'all',
                    label: '产量'
                }],
                options: [{
                    r: '东北',
                    m: 41354,
                    all: 4334434,
                    id: 3286,
                    children: [...]
                }...]
            };
        }
    }
</script>
```
:::

### 固定表头

::: demo 
```html
<template>
    <y-table title="中国各地区粮食产量表" :options="flatOptions" :column-config="columnConfig"  :header-fix="true" table-height="150px" />
</template>
<script>
    export default {
        data() {
            return {
                columnConfig: [{
                    key: 'r',
                    label: '区域'
                }, {
                    key: 'm',
                    label: '利润'
                }, {
                    key: 'all',
                    label: '产量'
                }],
                flatOptions: [{
                    r: '东北',
                    m: 41354,
                    all: 4334434,
                    id: 3286
                }...]
            };
        }
    }
</script>
```
:::

### 固定列

::: demo 
```html
<template>
    <y-table title="中国各地区粮食产量表" :options="flatOptions" :column-config="columnConfigFix" />
</template>
<script>
    export default {
        data() {
            return {
                columnConfigFix: [{
                    key: 'r',
                    label: '区域',
                    fixed: 'left',
                    width: '200px'
                }, {
                    key: 'area',
                    label: '所属地区',
                    width: '300px'
                }, {
                    key: 'p',
                    label: '所属省份',
                    width: '300px'
                }, {
                    key: 'm',
                    label: '利润',
                    width: '300px'
                }, {
                    key: 'all',
                    label: '产量',
                    width: '300px'
                }, {
                    key: 'id',
                    label: '区域编号',
                    fixed: 'right',
                    width: '200px'
                }],
                flatOptions: [{
                    r: '东北',
                    m: 41354,
                    all: 4334434,
                    id: 3286
                }...]
            };
        }
    }
</script>
```
:::

### 固定列和表头

::: demo 
```html
<template>
    <y-table title="中国各地区粮食产量表" :options="flatOptions" :column-config="columnConfigFix"  :header-fix="true" table-height="150px" />
</template>
<script>
    export default {
        data() {
            return {
                columnConfigFix: [{
                    key: 'r',
                    label: '区域',
                    fixed: 'left',
                    width: '200px'
                }, {
                    key: 'area',
                    label: '所属地区',
                    width: '300px'
                }, {
                    key: 'p',
                    label: '所属省份',
                    width: '300px'
                }, {
                    key: 'm',
                    label: '利润',
                    width: '300px'
                }, {
                    key: 'all',
                    label: '产量',
                    width: '300px'
                }, {
                    key: 'id',
                    label: '区域编号',
                    fixed: 'right',
                    width: '200px'
                }],
                flatOptions: [{
                    r: '东北',
                    m: 41354,
                    all: 4334434,
                    id: 3286
                }...]
            };
        }
    }
</script>
```
:::

### 嵌套表头

::: demo 
```html
<template>
    <y-table title="中国各地区粮食产量表" :options="flatOptions" />
        <y-table-column label="地区信息" column-key="r" fixed="left">
            <y-table-column label="区域编号" column-key="id" width="100px">
            </y-table-column>
            <y-table-column label="地区层级" column-key="area">
                <y-table-column label="地区" column-key="area" width="100px">
                </y-table-column>
                <y-table-column label="省份" column-key="p" width="100px">
                </y-table-column>
                <y-table-column label="区域" column-key="r" width="100px">
                </y-table-column>
            </y-table-column>
        </y-table-column>
        <y-table-column label="利润" column-key="m" width="300px">
        </y-table-column>
        <y-table-column label="产量" column-key="all" width="300px">
        </y-table-column>
    </y-table>
</template>
<script>
    export default {
        data() {
            return {
                columnConfigFix: [{
                    key: 'r',
                    label: '区域',
                    fixed: 'left',
                    width: '200px'
                }, {
                    key: 'area',
                    label: '所属地区',
                    width: '300px'
                }, {
                    key: 'p',
                    label: '所属省份',
                    width: '300px'
                }, {
                    key: 'm',
                    label: '利润',
                    width: '300px'
                }, {
                    key: 'all',
                    label: '产量',
                    width: '300px'
                }, {
                    key: 'id',
                    label: '区域编号',
                    fixed: 'right',
                    width: '200px'
                }],
                flatOptions: [{
                    r: '东北',
                    m: 41354,
                    all: 4334434,
                    id: 3286
                }...]
            };
        }
    }
</script>
```
:::

### 自定义表头单元格

::: demo 
```html
<template>
    <y-table title="中国各地区粮食产量表" :options="flatOptions" />
        <y-table-column label="地区信息" column-key="r" fixed="left">
            <y-table-column label="区域编号" column-key="id" width="100px">
                <div slot="header">区域编号(id)</div>
            </y-table-column>
            <y-table-column label="地区层级" column-key="area">
                <y-table-column label="地区" column-key="area" width="100px">
                </y-table-column>
                <y-table-column label="省份" column-key="p" width="100px">
                </y-table-column>
                <y-table-column label="区域" column-key="r" width="100px">
                </y-table-column>
            </y-table-column>
        </y-table-column>
        <y-table-column label="利润" column-key="m" width="300px">
        </y-table-column>
        <y-table-column label="产量" column-key="all" width="300px">
        </y-table-column>
    </y-table>
</template>
<script>
    export default {
        data() {
            return {
                columnConfigFix: [{
                    key: 'r',
                    label: '区域',
                    fixed: 'left',
                    width: '200px'
                }, {
                    key: 'area',
                    label: '所属地区',
                    width: '300px'
                }, {
                    key: 'p',
                    label: '所属省份',
                    width: '300px'
                }, {
                    key: 'm',
                    label: '利润',
                    width: '300px'
                }, {
                    key: 'all',
                    label: '产量',
                    width: '300px'
                }, {
                    key: 'id',
                    label: '区域编号',
                    fixed: 'right',
                    width: '200px'
                }],
                flatOptions: [{
                    r: '东北',
                    m: 41354,
                    all: 4334434,
                    id: 3286
                }...]
            };
        }
    }
</script>
```
:::

### 禁止表头收起

::: demo 
```html
<template>
    <y-table title="中国各地区粮食产量表" :options="flatOptions" />
        <y-table-column label="地区信息" column-key="r" fixed="left">
            <y-table-column label="区域编号" column-key="id" width="100px">
                <div slot="header">区域编号(id)</div>
            </y-table-column>
            <y-table-column label="地区层级" column-key="area" :extendable="false">
                <y-table-column label="地区" column-key="area" width="100px">
                </y-table-column>
                <y-table-column label="省份" column-key="p" width="100px">
                </y-table-column>
                <y-table-column label="区域" column-key="r" width="100px">
                </y-table-column>
            </y-table-column>
        </y-table-column>
        <y-table-column label="利润" column-key="m" width="300px">
        </y-table-column>
        <y-table-column label="产量" column-key="all" width="300px">
        </y-table-column>
    </y-table>
</template>
<script>
    export default {
        data() {
            return {
                columnConfigFix: [{
                    key: 'r',
                    label: '区域',
                    fixed: 'left',
                    width: '200px'
                }, {
                    key: 'area',
                    label: '所属地区',
                    width: '300px'
                }, {
                    key: 'p',
                    label: '所属省份',
                    width: '300px'
                }, {
                    key: 'm',
                    label: '利润',
                    width: '300px'
                }, {
                    key: 'all',
                    label: '产量',
                    width: '300px'
                }, {
                    key: 'id',
                    label: '区域编号',
                    fixed: 'right',
                    width: '200px'
                }],
                flatOptions: [{
                    r: '东北',
                    m: 41354,
                    all: 4334434,
                    id: 3286
                }...]
            };
        }
    }
</script>
```
:::

### 表头宽度拖动

::: demo 
```html
<template>
    <y-table title="中国各地区粮食产量表" :options="flatOptions" />
        <y-table-column label="地区信息" column-key="r" fixed="left">
            <y-table-column label="区域编号" column-key="id" width="100px">
            </y-table-column>
            <y-table-column label="地区层级" column-key="area" dragable>
                <y-table-column label="地区" column-key="area" width="100px" dragable>
                </y-table-column>
                <y-table-column label="省份" column-key="p" width="100px" dragable>
                </y-table-column>
                <y-table-column label="区域" column-key="r" width="100px" dragable>
                </y-table-column>
            </y-table-column>
        </y-table-column>
        <y-table-column label="利润" column-key="m" width="300px">
        </y-table-column>
        <y-table-column label="产量" column-key="all" width="300px">
        </y-table-column>
    </y-table>
</template>
<script>
    export default {
        data() {
            return {
                columnConfigFix: [{
                    key: 'r',
                    label: '区域',
                    fixed: 'left',
                    width: '200px'
                }, {
                    key: 'area',
                    label: '所属地区',
                    width: '300px'
                }, {
                    key: 'p',
                    label: '所属省份',
                    width: '300px'
                }, {
                    key: 'm',
                    label: '利润',
                    width: '300px'
                }, {
                    key: 'all',
                    label: '产量',
                    width: '300px'
                }, {
                    key: 'id',
                    label: '区域编号',
                    fixed: 'right',
                    width: '200px'
                }],
                flatOptions: [{
                    r: '东北',
                    m: 41354,
                    all: 4334434,
                    id: 3286
                }...]
            };
        }
    }
</script>
```
:::

### 树形表格

::: demo 
```html
<template>
    <y-table title="中国各地区粮食产量表" :options="options" :column-config="columnConfig" />
</template>
<script>
    export default {
        data() {
            return {
                columnConfig: [{
                    key: 'r',
                    label: '区域'
                }, {
                    key: 'm',
                    label: '利润'
                }, {
                    key: 'all',
                    label: '产量'
                }],
                options: [{
                    r: '东北',
                    m: 41354,
                    all: 4334434,
                    id: 3286,
                    children: [...]
                }...]
            };
        }
    }
</script>
```
:::

### 懒加载

::: demo 
```html
<template>
    <y-table title="中国各地区粮食产量表" :lazy-load="lazyLoad" :column-config="columnConfig" />
</template>
<script>
    export default {
        data() {
            return {
                columnConfig: [{
                    key: 'r',
                    label: '区域'
                }, {
                    key: 'm',
                    label: '利润'
                }, {
                    key: 'all',
                    label: '产量'
                }]
            };
        },
        methods: {
            lazyLoad(leaf, index, count, sort) {
                return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve();
                        }, 500);
                    }).then(() => {
                        return [...];
                    });
            }
        }
    }
</script>
```
:::

### 多选

::: demo 
```html
<template>
    <div class="md-box">
        <y-table title="中国各地区粮食产量表" :options="options" :column-config="columnConfig" multiple basic-index="id" />
    </div>
</template>
<script>
    export default {
        data() {
            return {
                columnConfig: [{
                    key: 'r',
                    label: '区域'
                }, {
                    key: 'm',
                    label: '利润'
                }, {
                    key: 'all',
                    label: '产量'
                }],
                options: [{
                    r: '东北',
                    m: 41354,
                    all: 4334434,
                    id: 3286,
                    children: [...]
                }...]
            };
        }
    }
</script>
```
:::

### 跨页多选

::: demo 
```html
<template>
    <div class="md-box">
        <y-table title="中国各地区粮食产量表" :options="flatOptions" :column-config="columnConfig" multiple basic-index="id" page-batch-select />
    </div>
</template>
<script>
    export default {
        data() {
            return {
                columnConfig: [{
                    key: 'r',
                    label: '区域'
                }, {
                    key: 'm',
                    label: '利润'
                }, {
                    key: 'all',
                    label: '产量'
                }],
                flatOptions: [{
                    r: '东北',
                    m: 41354,
                    all: 4334434,
                    id: 3286
                }...]
            };
        }
    }
</script>
```
:::

### 排序

::: demo 
```html
<template>
    <div class="md-box">
        <y-table title="中国各地区粮食产量表" :options="flatOptions" :column-config="columnConfigSort" :default-sort="{key: 'all', order: 'desc'}" />
    </div>
</template>
<script>
    export default {
        data() {
            return {
                columnConfigSort: [{
                    key: 'r',
                    label: '区域'
                }, {
                    key: 'm',
                    label: '利润'
                }, {
                    key: 'all',
                    label: '产量',
                    sortable: true
                }],
                flatOptions: [{
                    r: '东北',
                    m: 41354,
                    all: 4334434,
                    id: 3286
                }...]
            };
        }
    }
</script>
```
:::

### 自定义排序

::: demo 
```html
<template>
    <y-table title="中国各地区粮食产量表" :options="flatOptions" />
        <y-table-column label="地区信息" column-key="r" fixed="left">
            <y-table-column label="区域编号" column-key="id" width="100px">
            </y-table-column>
            <y-table-column label="地区层级 自定义排序(利润/产量)" column-key="area" sortable :compare="compare">
                <y-table-column label="地区" column-key="area" width="100px" sortable>
                </y-table-column>
                <y-table-column label="省份" column-key="p" width="100px" sortable>
                </y-table-column>
                <y-table-column label="区域" column-key="r" width="100px" sortable>
                </y-table-column>
            </y-table-column>
        </y-table-column>
        <y-table-column label="利润" column-key="m" width="300px" sortable>
        </y-table-column>
        <y-table-column label="产量" column-key="all" width="300px" sortable>
        </y-table-column>
    </y-table>
</template>
<script>
    export default {
        data() {
            return {
                columnConfigFix: [{
                    key: 'r',
                    label: '区域',
                    fixed: 'left',
                    width: '200px'
                }, {
                    key: 'area',
                    label: '所属地区',
                    width: '300px'
                }, {
                    key: 'p',
                    label: '所属省份',
                    width: '300px'
                }, {
                    key: 'm',
                    label: '利润',
                    width: '300px'
                }, {
                    key: 'all',
                    label: '产量',
                    width: '300px'
                }, {
                    key: 'id',
                    label: '区域编号',
                    fixed: 'right',
                    width: '200px'
                }],
                flatOptions: [{
                    r: '东北',
                    m: 41354,
                    all: 4334434,
                    id: 3286
                }...]
            };
        },
        methods: {
            compare(a, b) {
                return (a.m / a.all) > (b.m / b.all) ? 1 : -1;
            }
        }
    }
</script>
```
:::

### 合并行或列

::: demo 
```html
<template>
    <div class="md-box">
        <y-table :options="options" title="中国各地区粮食产量表" :content-max-height="250"
                 header-fix table-height="500px" stripe :colspan-keys="[['area', 'p', 'r']]" >
            <y-table-column label="区域" column-key="area" dragable fixed="left" rowspan width="200px">
            </y-table-column>
            <y-table-column label="省" column-key="p" dragable fixed="left" rowspan width="200px">
            </y-table-column>
            <y-table-column label="区" column-key="r" dragable fixed="left" width="200px">
            </y-table-column>
            <y-table-column label="利润" column-key="m" dragable>
            </y-table-column>
            <y-table-column label="销售额" column-key="all" dragable>
            </y-table-column>
        </y-table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                columnConfig: [{
                    key: 'r',
                    label: '区域'
                }, {
                    key: 'm',
                    label: '利润'
                }, {
                    key: 'all',
                    label: '产量'
                }],
                options: [{
                    r: '东北',
                    m: 41354,
                    all: 4334434,
                    id: 3286,
                    children: [...]
                }...]
            };
        }
    }
</script>
```
:::

### 交叉表

::: demo 
```html
<template>
    <div class="md-box">
        <y-table multiple :options="options" title="中国各地区粮食产量表" :content-max-height="250"
                 header-fix table-height="500px" stripe :colspan-keys="[['area', 'p', 'r']]"
                 basic-index="r" page-batch-select transverse-tree-table
                 :transverse-tree-table-columns="['area', 'p', 'r']">
            <y-table-column label="区域" column-key="area" dragable fixed="left" rowspan width="200px">
            </y-table-column>
            <y-table-column label="省" column-key="p" dragable fixed="left" rowspan width="200px">
            </y-table-column>
            <y-table-column label="区" column-key="r" dragable fixed="left" rowspan width="200px">
            </y-table-column>
            <y-table-column label="利润" column-key="m" dragable>
            </y-table-column>
            <y-table-column label="销售额" column-key="all" dragable>
            </y-table-column>
        </y-table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                columnConfig: [{
                    key: 'r',
                    label: '区域'
                }, {
                    key: 'm',
                    label: '利润'
                }, {
                    key: 'all',
                    label: '产量'
                }],
                options: [{
                    r: '东北',
                    m: 41354,
                    all: 4334434,
                    id: 3286,
                    children: [...]
                }...]
            };
        }
    }
</script>
```
:::

### table属性

| 参数      | 说明                             | 类型      | 可选值       | 默认值 |
| -------- | -------------------------------- | -------- | ----------- | ----- |
| options   | 同步数据 | array    | - | null |
| lazyLoad     | 异步获取数据函数    | function   | - | (leaf, index, count, sortData) => {return new Promise((resolve, reject) => {resolve();}).then(() => {return {options: [],total: 0};});} |
| columnConfig  | 列配置  | array   | -           | [] |
| title | 表名   | string   | -           | '' |
| countOptions | 每页展示数量选项   | array   | -           | [15, 30, 50, 100] |
| headerFix | 是否固定表头   | boolean   | -           | false |
| tableHeight | 固定表头时表体高度   | string   | -           | - |
| defaultSort | 默认排序列及方式   | object   | -           | {} |
| pageBatchSelect | 是否跨页多选   | boolean   | -           | false |
| basicIndex | 多选基准字段   | string   | -           | '' |
| selected | 多选选中项   | array   | -           | [] |
| stripe | 是否展示斑马纹   | boolean   | -           | false |
| setRowClass | 为行设置类名，入参行数据   | function   | -           | null |
| colspanKeys | 合并列   | array   | -           | [] |
| transverseTreeTable | 是否展示为交叉表   | boolean   | -           | false |
| transverseTreeTableColumns | 交叉表侧表头层级，由左至右   | array   | -           | [] |

### table-column属性

| 参数      | 说明                             | 类型      | 可选值       | 默认值 |
| -------- | -------------------------------- | -------- | ----------- | ----- |
| label   | 列名 | string    | - | '' |
| columnKey     | 列数据的key值   | string   | - | '' |
| width  | 列宽    | string   | -           | null |
| fixed | 列固定 (默认''表示center)   | string   | left, right    | '' |
| rowspan | 该列合并行   | boolean   | -           | false |
| dragable | 该列是否可拖拽改变宽度   | boolean   | -           | false |
| sortable | 该列是否可拖拽排序   | boolean   | -           | false |
| extend | 该表头是否展开子表头   | boolean   | -           | true |
| extendable | 该表头是否可以展开子表头   | boolean   | -           | true |
| compare | 该列的自定义排序方法   | function   | -           | - |
| align | 该列内容对齐方式   | string   | left, center, right  | left |

### table Slot

| Slot名称  | 说明                             |
| -------- | -------------------------------- |
| default  | 配置table-column |
| 'row' + rowData.$y_table_level  | 自定义行内容 |


### table-column Slot

| Slot名称  | 说明                             |
| -------- | -------------------------------- |
| default  | 嵌套表头table-column |
| header  | scoped slot自定义表头单元格 |
| cell  | scoped slot自定义表格内容单元格 |

### table事件

| 事件名称  | 说明                              | 事件参数  |
| -------- | -------------------------------- | -------- |
| rowClick    | 行点击事件 | rowData |
| multipleSelect    | 多选事件 | selected array or ['all'] |
