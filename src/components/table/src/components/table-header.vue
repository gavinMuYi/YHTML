<template>
    <thead class="y-table-header">
        <y-table-header-row
            ref="tr"
            v-for="(row, rindex) in level" :key="'row-' + rindex"
            :residue="level - rindex"
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
            if (this.selfRowHeight[index] === 0) {
                return {
                    height: this.rowHeight[index] + 'px'
                };
            }
            if (this.selfRowHeight[index] && this.selfRowHeight[index + 1] === 0) {
                let start = index;
                let end = start + 1;
                while (this.selfRowHeight[end] === 0) {
                    end++;
                }
                let sum = 0;
                while (start < end) {
                    sum += this.rowHeight[start];
                    start++;
                }
                if (this.selfRowHeight[index] < sum) {
                    return {
                        height: this.rowHeight[index] + 'px'
                    };
                }
                return {
                    height: this.rowHeight[index] - 1 + 'px'
                };
            }
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
            position: relative;
        }
    }
</style>
