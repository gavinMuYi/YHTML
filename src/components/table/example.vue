<template>
    <div class="y-table_example">
        <y-table :multiple="true" :options="tableListArea" title="TABLE EXAMPLE 3"
                 :stripe="true" :colspanKeys="[['area', 'p', 'r']]" basicIndex="all"
                 transverseTreeTable :transverseTreeTableColumns="['area', 'p', 'r']" >
            <y-table-column label="区域" columnKey="area" dragable fixed="left" rowspan />
            <y-table-column label="省" columnKey="p" dragable fixed="left" rowspan />
            <y-table-column label="区" columnKey="r" dragable fixed="left" rowspan />
            <y-table-column label="利润" columnKey="m" dragable/>
            <y-table-column label="销售额" columnKey="all" dragable />
        </y-table>
    </div>
</template>

<script>
import HeaderEx from './headerex';
import YTable from './src/index';
import YTableColumn from './src/components/table-column';
export default {
    name: 'YTableExample',
    components: {
        YTable,
        YTableColumn,
        HeaderEx
    },
    data() {
        let c = '7912837419823741283476123846123784637rey734tr6734tr63tregr7d34gr7fg734fg3yugf73g7gf3';
        return {
            lll: 100,
            leftheight: 100,
            rightheight: 200,
            left: 0,
            str: '',
            c: c,
            tableListArea: [{
                area: '东北',
                p: '东北',
                r: '东北',
                m: 321241,
                all: 51524131,
                children: [{
                    area: '东北',
                    p: '吉林',
                    r: '吉林',
                    m: 3285741,
                    all: 5153521,
                    children: [{
                        area: '东北',
                        p: '吉林',
                        r: 'A区',
                        m: 324197858,
                        all: 515216875,
                    }, {
                        area: '东北',
                        p: '吉林',
                        r: 'B区',
                        m: 32418758,
                        all: 56471521,
                    }]
                }, {
                    area: '东北',
                    p: '辽宁',
                    r: '辽宁',
                    m: 3248751,
                    all: 5157521,
                    children: [{
                        area: '东北',
                        p: '辽宁',
                        r: 'A区',
                        m: 3287541,
                        all: 5155821,
                    }, {
                        area: '东北',
                        p: '辽宁',
                        r: 'B区',
                        m: 3282541,
                        all: 5581521,
                    }, {
                        area: '东北',
                        p: '辽宁',
                        r: 'C区',
                        m: 3247581,
                        all: 5152357571,
                    }]
                }, {
                    area: '东北',
                    p: '黑龙江',
                    r: '黑龙江',
                    m: 3246531,
                    all: 51528467801,
                    children: [{
                        area: '东北',
                        p: '黑龙江',
                        r: 'A区',
                        m: 32789041,
                        all: 515068021,
                    }, {
                        area: '东北',
                        p: '黑龙江',
                        r: 'B区',
                        m: 324542131,
                        all: 5106547635521,
                    }]
                }]
            }],
            tableList3: [{
                label: 'sd2',
                key: 'as3d1',
                c: '32'
            }, {
                label: 'sd3',
                key: 'as3d',
                c: '32',
                hasChildren: true
            }],
            tableList2: [{
                label: 'sd2',
                key: 'as3d213',
                c: '32'
            }, {
                label: 'sd2',
                key: 'as341324d',
                c: c + c + c,
                children: [{
                    key: 'we22222rvfwd',
                    label: 'sdaf22222',
                    children: [{
                        key: 'wasdffee33333',
                        label: 'sgdafgfddaf33333'
                    }, {
                        key: 'was3333dffe33333',
                        label: 'sg4444dafgfddaf33333'
                    }]
                }]
            }, {
                label: 'sdrrrerv2',
                key: 'asvrwr3d',
                c: c + c + c
            }],
            tableList: [{
                label: 'sqwerd',
                key: 'asqewqwrd'
            }, {
                label: 'sd',
                key: 'asd',
                children: [{
                    key: 'we',
                    label: 'sdaf',
                    children: [{
                        key: 'wasdffe',
                        label: 'sgdafgfddaf'
                    }, {
                        key: 'wasdffe',
                        label: 'sgdafgfddaf'
                    }]
                }, {
                    key: 'wesad3123f',
                    label: 'sda212f',
                    children: [{
                        key: 'wasd312ffe',
                        label: 'sgdaf3123gfddaf'
                    }]
                }]
            }, {
                label: 'sd2',
                key: 'as3d',
                children: [{
                    key: 'wde',
                    label: 'sdwaf'
                }]
            }, {
                label: 'sd2',
                key: 'as3d',
            }, {
                label: 'sd2',
                key: 'as3d',
            }, {
                label: 'sd2',
                key: 'as3d',
            }, {
                label: 'sd2',
                key: 'as3d',
            }, {
                label: 'sd2',
                key: 'as3d',
            }, {
                label: 'sd2',
                key: 'as23413d',
            }, {
                label: 'sd2',
                key: 'as3d',
            }, {
                label: 'sd2',
                key: 'as3d',
            }, {
                label: 'sd2',
                key: 'as3d',
            }, {
                label: 'sd2',
                key: 'as12343d',
            }, {
                label: 'sd2',
                key: 'as3d',
            }, {
                label: 'sd2',
                key: 'as3d',
            }, {
                label: 'sd2',
                key: 'as3d',
            }, {
                label: 'sd2',
                key: 'as3d',
            }, {
                label: 'sd2',
                key: 'as3d',
            }, {
                label: 'sd2',
                key: 'as3d',
            }, {
                label: 'sd2',
                key: 'as3d',
            }, {
                label: 'sd2',
                key: 'as3d',
            }, {
                label: 'sd2',
                key: 'as3d',
            }, {
                label: 'sd2',
                key: 'as3d',
            }, {
                label: 'sd2',
                key: 'as3d',
            }, {
                label: 'sd2',
                key: 'as3d',
            }, {
                label: 'sd32',
                key: 'as3d',
            }, {
                label: 'sd2',
                key: 'as3d',
            }, {
                label: 'sd2',
                key: 'as3d',
            }, {
                label: 'sd2',
                key: 'as3d',
            }, {
                label: 'sd2',
                key: 'as3d',
            }, {
                label: 'sd2',
                key: 'as3d',
            }, {
                label: 'sd2',
                key: 'as3d',
            }]
        };
    },
    methods: {
        setRowClass(rowData, index) {
            if (index === 2) {
                return 'customer-row-warning';
            }
        },
        llladd() {
            this.lll = 200;
            console.log('22');
        },
        lefth() {
            this.leftheight = 100;
            this.rightheight = 100;
        },
        righth() {
            this.leftheight = 200;
            this.rightheight = 100;
        },
        lazyLoadArea(leaf, index, count, sort) {
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
                let answer = getItem(this.tableListArea, leaf);
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
                        options: this.tableListArea.map(item => {
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
        },
        lazyLoad(leaf, index, count, sort) {
            if (leaf) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve();
                    }, 1000);
                }).then(() => {
                    return [{
                        label: 'sd2111',
                        key: 'as3d111',
                    }, {
                        label: 'sd2111',
                        key: 'as3d111',
                    }];
                });
            } else {
                return new Promise((resolve, reject) => {
                    resolve();
                }).then(() => {
                    return {
                        options: this.tableList3,
                        total: 3
                    };
                });
            }
        },
        heightadd() {
            if (this.c) {
                this.c = '';
            } else {
                this.c = '7912837419823741283476123846123784637rey734tr6734tr63tregr7d34gr7fg734fg3yugf73g7gf3';
            }
            if (!this.str) {
                this.str = '-sahdvhavjdskjvknasjkvbajksdbvnjkasdvjaasdmfalksdmfklasmdfkasmdfasdfsdv';
            } else {
                this.str = '';
            }
        }
    }
};
</script>

<style lang="less">
    .y-table_example {
        .ex-table-box {
            width: 100%;
            overflow: auto;
            .ex-table {
                border-spacing: 0px;
                min-width: 100%;
                td {
                    background: @white;
                }
                .left {
                    position: relative;
                    .cell {
                        height: 50px;
                    }
                }
                .cell {
                    width: 200px;
                }
            }
        }
        .y-table {
            margin-bottom: 40px;
            .customer-row-warning {
                background: @error;
            }
        }
    }
</style>
