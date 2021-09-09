<template>
    <thead class="y-table-header">
        <y-table-header-row
            ref="tr"
            v-for="(row, rindex) in level" :key="'row-' + rindex"
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
        }
    },
    methods: {
        rowStyle(index) {
            if (this.rowHeight[index]) {
                return {
                    height: this.selfRowHeight[index] < this.rowHeight[index]
                        ? this.rowHeight[index] + 'px'
                        : this.rowHeight[index] - 1 + 'px'
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
        }
    }
</style>
