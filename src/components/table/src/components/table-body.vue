<template>
    <tbody class="y-table-body">
        <y-table-row
            ref="tr"
            v-for="(row, rindex) in tableList" :key="'row-' + rindex"
            :rowData="row" :columns="columns" :index="rindex" :actionTable="actionTable"
            :tableList="tableList" :style="rowStyle(rindex)" />
    </tbody>
</template>

<script>
import YTableRow from './table-row';

export default {
    name: 'YTableBody',
    components: {
        YTableRow
    },
    props: {
        columns: {
            type: Array,
            default: () => {
                return [];
            }
        },
        rowHeight: {
            type: Array,
            default: () => {
                return [];
            }
        },
        selfRowHeight: {
            type: Array,
            default: () => {
                return [];
            }
        },
        tableList: {
            type: Array,
            default: () => {
                return [];
            }
        },
        actionTable: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
        };
    },
    methods: {
        rowStyle(index) {
            if (this.selfRowHeight[index] === 0 || (!this.selfRowHeight[index] && this.actionTable)) {
                return {
                    height: this.rowHeight[index] + 'px'
                };
            }
            if (this.rowHeight[index]) {
                return {
                    height: this.selfRowHeight[index] < this.rowHeight[index]
                        ? this.rowHeight[index] + 'px'
                        : 'auto'
                };
            }
            return {};
        }
    }
};
</script>

<style lang="less">
    .y-table-body {
        .y-table-cell {
            min-height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>
