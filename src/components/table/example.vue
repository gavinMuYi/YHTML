<template>
    <div class="y-table_example">
        <y-table title="TABLE EXAMPLE 0" :lazyLoad="lazyLoad">
            <y-table-column label="keyLabelRight" columnKey="key" fixed="right" width="200px" dragable />
            <y-table-column label="二级" columnKey="label" width="500px" dragable>
            </y-table-column>
            <y-table-column label="keyLabelL" columnKey="key" fixed="left" width="100px" :rowspan="true" dragable />
        </y-table>
        <y-table :multiple="true" :contentMaxHeight="250" :options="tableList2" title="TABLE EXAMPLE 1">
            <y-table-column :label="'keyLabelLeft'" columnKey="key" fixed="left">
                <y-table-column :label="'headerddd-111-一级' + c + c + c + c + str" columnKey="c" :rowspan="true"
                                dragable>
                    <!-- <div slot="header">{{ 'headerddd-111-一级' + str }}</div> -->
                    <div slot-scope="props" slot="cell" @click="heightadd">
                        {{ props.label + '-' + props.key }}
                    </div>
                </y-table-column>
            </y-table-column>
            <y-table-column label="keyLabelRight" columnKey="key" fixed="right" width="200px" dragable />
            <y-table-column label="keyLabelL" columnKey="key" fixed="left" width="100px" :rowspan="true" dragable />
            <y-table-column label="一级">
                <div slot="header">header-111-一级</div>
                <y-table-column label="二级" columnKey="label" width="50px" dragable>
                </y-table-column>
                <y-table-column label="二级">
                    <y-table-column label="三级" columnKey="label" width="100px" dragable>
                        <div slot="header">cell slot can click</div>
                        <div slot-scope="props" slot="cell">
                            {{ props.label + '-' + props.key }}
                        </div>
                    </y-table-column>
                    <y-table-column label="三级" columnKey="label" width="50px" dragable>
                        <div slot="header">header-111-三级</div>
                    </y-table-column>
                    <y-table-column label="三级" columnKey="label" width="50px" dragable>
                    </y-table-column>
                </y-table-column>
                <y-table-column label="Labelin1" columnKey="label" width="100px" dragable/>
                <y-table-column label="Labelin2" columnKey="label" width="50px" dragable/>
            </y-table-column>
            <y-table-column label="keyLabelCenter" columnKey="key" width="250px" dragable/>
            <div slot-scope="props" slot="row2">
                <div v-if="props.name === 'left'" @click="lefth"
                     :style="{height: leftheight + 'px'}">d111{{ props }}</div>
                <div v-else @click="righth" :style="{height: rightheight + 'px'}">d222{{ props}}</div>
            </div>
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
        <y-table :multiple="false" :contentMaxHeight="250" :options="tableList" title="TABLE EXAMPLE 2"
                 :headerFix="true">
            <y-table-column :label="'keyLabelLeft'" columnKey="key" fixed="left">
                <y-table-column :label="'headerddd-111-一级'" columnKey="key" :rowspan="true">
                    <div slot-scope="props" slot="header">{{ 'headerddd-111-一级' + str }}</div>
                    <div slot-scope="props" slot="cell" @click="heightadd">
                        {{ props.label + '-' + props.key + str }}
                    </div>
                </y-table-column>
            </y-table-column>
            <y-table-column label="keyLabelRight" columnKey="key" fixed="right" width="200px" />
            <y-table-column label="一级">
                <div slot="header">header-111-一级</div>
                <y-table-column label="二级" columnKey="label" width="50px" dragable>
                </y-table-column>
                <y-table-column label="二级">
                    <y-table-column label="三级" columnKey="label" width="100px">
                        <div slot="header">cell slot can click</div>
                        <div slot-scope="props" slot="cell">
                            {{ props.label + '-' + props.key }}
                        </div>
                    </y-table-column>
                    <y-table-column label="三级" columnKey="label" width="50px">
                        <div slot="header">header-111-三级</div>
                    </y-table-column>
                    <y-table-column label="三级" columnKey="label" width="50px">
                    </y-table-column>
                </y-table-column>
                <y-table-column label="Labelin1" columnKey="label" width="100px" />
                <y-table-column label="Labelin2" columnKey="label" width="50px" />
            </y-table-column>
            <y-table-column label="keyLabelCenter" columnKey="key" width="550px" />
        </y-table>
    </div>
</template>

<script>
import YTable from './src/index';
import YTableColumn from './src/components/table-column';
export default {
    name: 'YTableExample',
    components: {
        YTable,
        YTableColumn
    },
    data() {
        let c = '7912837419823741283476123846123784637rey734tr6734tr63tregr7d34gr7fg734fg3yugf73g7gf3';
        return {
            leftheight: 100,
            rightheight: 200,
            left: 0,
            str: '',
            c: c,
            tableList3: [{
                label: 'sd2',
                key: 'as3d',
                c: '32'
            }, {
                label: 'sd2',
                key: 'as3d',
                c: '32'
            }, {
                label: 'sd2',
                key: 'as3d',
                c: '32',
                hasChildren: true
            }],
            tableList2: [{
                label: 'sd2',
                key: 'as3d',
                c: '32'
            }, {
                label: 'sd2',
                key: 'as3d',
                c: c + c + c,
                children: [{
                    key: 'we22222',
                    label: 'sdaf22222',
                    children: [{
                        key: 'wasdffe33333',
                        label: 'sgdafgfddaf33333'
                    }, {
                        key: 'was3333dffe33333',
                        label: 'sg4444dafgfddaf33333'
                    }]
                }]
            }, {
                label: 'sd2',
                key: 'as3d',
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
                        key: 'was3333dffe',
                        label: 'sg4444dafgfddaf'
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
            }]
        };
    },
    methods: {
        lefth() {
            this.leftheight = 100;
            this.rightheight = 100;
        },
        righth() {
            this.leftheight = 200;
            this.rightheight = 100;
        },
        lazyLoad(leaf) {
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
                    background: #fff;
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
        }
    }
</style>
