<template>
    <thead class="y-table-header">
        <y-table-header-row
            ref="tr"
            v-for="(row, rindex) in level" :key="'row-' + rindex" :rindex="rindex"
            :residue="level - rindex" :actionTable="actionTable" :level="level"
            :rowData="columns[rindex]" :style="rowStyle(rindex)" />
    </thead>
</template>

<script>
import YTableHeaderRow from './table-header-row';
export default {
    name: 'YTableHeader',
    components: {
        YTableHeaderRow,
    },
    props: {
        columns: {
            type: Array,
            default: () => {
                return [];
            }
        },
        level: {
            type: Number,
            default: 0
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
        actionTable: {
            type: Boolean,
            default: false
        }
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
    .y-table-header {
        background: #dbf4f0;
        .y-table-cell {
            min-height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
        }
    }
</style>
