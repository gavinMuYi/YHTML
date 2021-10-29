<template>
    <thead class="y-table-header">
        <y-table-header-row
            ref="tr" :defaultSort="currentSort.key ? {} : defaultSort"
            v-for="(row, rindex) in level" :key="'row-' + rindex" :rindex="rindex"
            :residue="level - rindex" :actionTable="actionTable" :level="level"
            :rowData="columns[rindex]" :style="rowStyle(rindex)" :name="name"
            @allSelectToast="allSelectToast"
            @select="handleSelect" :checkBoxStatus="checkBoxStatus" :allSelected="allSelected"
            @columnSort="columnSort" :currentSort="nowSort" @newExtendStatus="newExtendStatus($event, rindex)" />
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
        },
        allSelected: {
            type: Boolean,
            default: false
        },
        currentSort: {
            type: Object,
            default: () => {
                return {};
            }
        },
        name: {
            type: String,
            default: ''
        },
        defaultSort: {
            type: Object,
            default: () => {
                return {};
            }
        },
        checkBoxStatus: {
            type: String,
            default: ''
        }
    },
    computed: {
        nowSort() {
            if (this.currentSort.key && this.currentSort.name === this.name) {
                return this.currentSort;
            }
            return {};
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
        },
        columnSort(order, key, compare, columnIndex) {
            this.$emit('columnSort', {
                order, key, compare, columnIndex
            });
        },
        newExtendStatus({ key, newStatus, index }, rindex) {
            this.$emit('newExtendStatus', {
                key, newStatus, gindex: index, deep: rindex + 1
            });
        },
        handleSelect(status) {
            this.$emit('select', null, status);
        },
        allSelectToast() {
            this.$emit('allSelectToast');
        }
    }
};
</script>

<style lang="less">
    .y-table-header {
        background: @greenGray;
        .y-table-cell {
            min-height: 60px;
            position: relative;
        }
    }
</style>
