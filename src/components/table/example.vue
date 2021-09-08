<template>
    <div class="y-table_example">
        <y-table :count="2" :multiple="true" :contentMaxHeight="250">
            <y-table-column label="keyLabelLeft" columnKey="key" fixed="left">
                <y-table-column :label="'header-111-一级' + str" columnKey="key">
                    <div slot-scope="props" slot="cell" @click="heightadd">
                        {{ props.label + '-' + props.key + str }}
                    </div>
                </y-table-column>
            </y-table-column>
            <y-table-column label="keyLabelRight" columnKey="key" fixed="right" width="200px" />
            <y-table-column label="一级">
                <div slot="header">header-111-一级</div>
                <y-table-column label="二级" columnKey="label" width="50px">
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
        return {
            left: 0,
            str: ''
        };
    },
    methods: {
        heightadd() {
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
    }
</style>
