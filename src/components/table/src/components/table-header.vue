<template>
    <thead class="y-table-header">
        <tr v-for="(row, rindex) in columns" :key="'row-' + rindex">
            <th v-for="(th, tindex) in row" :key="rindex + '-th-' + tindex"
                :colspan="th.colSpan" :rowspan="th.rowSpan"
                :style="headerCellStyle(th.width)"
                :class="[th.fixed ? `y-table-cell_fixed-${th.fixed}`: '']">
                <div class="y-table-cell">
                    {{ th.label }}
                </div>
            </th>
        </tr>
    </thead>
</template>

<script>
export default {
    name: 'YTableHeader',
    props: {
        columns: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    methods: {
        headerCellStyle(width) {
            if (!width) {
                return {
                    minWidth: '50px'
                };
            }
            return {
                width: width,
                minWidth: width
            };
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
