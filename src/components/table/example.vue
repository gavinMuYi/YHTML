<template>
    <div class="y-table_example">
        <y-table title="TABLE EXAMPLE 0" :lazyLoad="lazyLoad" :headerFix="true" tableHeight="150px"
                 :defaultSort="{key: 'label', order: 'desc'}" :setRowClass="setRowClass">
            <y-table-column label="keyLabelRight" columnKey="key" fixed="right" width="200px" dragable />
            <y-table-column label="二级" columnKey="label" width="500px" dragable sortable>
            </y-table-column>
            <y-table-column label="keyLabelL" columnKey="key" fixed="left" width="100px" :rowspan="true"
                            dragable sortable />
        </y-table>
        <y-table :multiple="true" :contentMaxHeight="250" :options="tableList2" title="TABLE EXAMPLE 1"
                 basicIndex="key" :pageBatchSelect="true">
            <y-table-column :label="'keyLabelLeft'" columnKey="key" fixed="left">
                <y-table-column :label="'headerddd-111-一级' + c + c + c + c + str" columnKey="c" :rowspan="true"
                                dragable>
                    <!-- <div slot="header">{{ 'headerddd-111-一级' + str }}</div> -->
                    <div slot-scope="props" slot="cell" @click="heightadd">
                        {{ props.label + '-' + props.key }}
                    </div>
                </y-table-column>
            </y-table-column>
            <y-table-column label="keyLabelRight" columnKey="key" fixed="right" width="200px" dragable sortable />
            <y-table-column label="keyLabelL" columnKey="key" fixed="left" width="100px" :rowspan="true" dragable />
            <y-table-column label="一级" columnKey="key">
                <div slot="header">header-111-一级</div>
                <y-table-column label="二级" columnKey="label" width="50px" dragable>
                </y-table-column>
                <y-table-column label="二级" columnKey="key" dragable>
                    <y-table-column label="三级" columnKey="label" width="100px" dragable>
                        <div slot="header">cell slot can click</div>
                    </y-table-column>
                    <y-table-column label="三级" columnKey="label" width="50px" dragable>
                        <div slot="header">header-111-三级</div>
                    </y-table-column>
                    <y-table-column label="三级" columnKey="label" width="50px" dragable>
                    </y-table-column>
                </y-table-column>
                <y-table-column label="Labelin1" columnKey="label" width="100px" dragable align="right" />
                <y-table-column label="Labelin2" columnKey="label" width="50px" dragable/>
            </y-table-column>
            <y-table-column label="keyLabelCenter" columnKey="key" width="250px" dragable/>
            <!-- <div slot-scope="props" slot="row2">
                <div v-if="props.name === 'left'" @click="lefth"
                     :style="{height: leftheight + 'px'}">d111{{ props }}</div>
                <div v-else @click="righth" :style="{height: rightheight + 'px'}">d222{{ props}}</div>
            </div> -->
        </y-table>
        <!-- <div class="ex-table-box" ref="box">
            <table class="ex-table">
                <tr v-for="item in [1,2,3,4,5,6,7,8,32,10,9]" :key="item">
                    <td class="left" :style="{left: left + 'px'}"><div class="cell">left1</div></td>
                    <td class="left" :style="{left: left + 'px'}"><div class="cell">left2</div></td>
                    <td><div class="cell">center1</div></td>
                    <td><div class="cell">center2</div></td>
                    <td><div class="cell">center3</div></td>
                    <td class="right"><div class="cell">right1</div></td>
                    <td class="right"><div class="cell">right2</div></td>
                </tr>
            </table>
        </div> -->
        <y-table :multiple="true" :contentMaxHeight="250" :options="tableList" title="TABLE EXAMPLE 2"
                 :headerFix="true" tableHeight="500px" :stripe="true" :colspanKeys="[['key', 'label']]">
            <y-table-column :label="'keyLabelLeft'" columnKey="key" fixed="left">
                <y-table-column :label="'headerddd-111-一级'" columnKey="key" :rowspan="true">
                    <div slot-scope="props" slot="header">{{ 'headerddd-111-一级' + str }}</div>
                    <div slot-scope="props" slot="cell" @click="heightadd">
                        {{ props.label + '-' + props.key + str }}
                    </div>
                </y-table-column>
            </y-table-column>
            <y-table-column label="keyLabelRight" columnKey="key" fixed="right" width="200px" />
            <y-table-column label="一级" columnKey="key">
                <div slot="header">header-111-一级</div>
                <y-table-column label="二级" columnKey="label" width="50px" dragable :rowspan="true">
                </y-table-column>
                <y-table-column label="二级" columnKey="key">
                    <y-table-column label="三级" columnKey="label" width="100px" dragable :rowspan="true">
                        <div slot-scope="props" slot="header"><HeaderEx /></div>
                        <div slot-scope="props" slot="cell">
                            {{ props.label + '-' + props.key }}
                        </div>
                    </y-table-column>
                    <y-table-column label="三级" columnKey="label" width="50px" dragable>
                        <div slot="header">header-111-三级</div>
                    </y-table-column>
                    <y-table-column label="三级" columnKey="key" width="50px">
                    </y-table-column>
                </y-table-column>
                <y-table-column label="Labelin1" columnKey="label" width="100px" sortable />
                <y-table-column label="Labelin2" columnKey="label" width="50px" />
            </y-table-column>
            <y-table-column label="keyLabelCenter" columnKey="key" width="550px" dragable/>
        </y-table>
        <y-table :multiple="true" :options="tableListArea" title="TABLE EXAMPLE 3"
                 :stripe="true" :colspanKeys="[['area', 'p', 'r']]" basicIndex="r"
                 :pageBatchSelect="true" @multipleSelect="areaselect"
                 transverseTreeTable :transverseTreeTableColumns="['area', 'p', 'r']" >
            <y-table-column label="区域" columnKey="area" dragable fixed="left" rowspan />
            <y-table-column label="省" columnKey="p" dragable fixed="left" rowspan />
            <y-table-column label="区" columnKey="r" dragable fixed="left" rowspan />
            <y-table-column label="利润" columnKey="m" dragable/>
            <y-table-column label="销售额" columnKey="all" dragable />
        </y-table>
        <y-table :lazyLoad="lazyLoadArea" title="TABLE EXAMPLE 3 LAZY"
                 :stripe="true" :colspanKeys="[['area', 'p', 'r']]"
                 transverseTreeTable :transverseTreeTableColumns="['area', 'p', 'r']" >
            <y-table-column label="区域" columnKey="area" dragable fixed="left" rowspan />
            <y-table-column label="省" columnKey="p" dragable fixed="left" rowspan />
            <y-table-column label="区" columnKey="r" dragable fixed="left" />
            <y-table-column label="利润" columnKey="m" dragable/>
            <y-table-column label="销售额" columnKey="all" dragable />
        </y-table>
        <y-table :contentMaxHeight="250" :options="tableListArea" title="TABLE EXAMPLE 4"
                 :headerFix="true" tableHeight="500px" :stripe="true" :colspanKeys="[['area', 'p', 'r']]" >
            <y-table-column label="区域" columnKey="area" dragable fixed="left" rowspan />
            <y-table-column label="省" columnKey="p" dragable fixed="left" rowspan />
            <y-table-column label="区" columnKey="r" dragable fixed="left" />
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
        areaselect(val) {
            console.log(val);
        },
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
