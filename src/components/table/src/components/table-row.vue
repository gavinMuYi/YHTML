<template>
    <tr class="y-table-row">
        <td v-for="(td, tindex) in columns" :key="'td-' + tindex"
            :colspan="1" :rowspan="1"
            :class="[td.fixed ? `y-table-cell_fixed-${td.fixed}`: '']">
            <div class="y-table-cell">
                {{ rowData[td.columnKey] }}
            </div>
        </td>
    </tr>
</template>

<script>
export default {
    name: 'YTableRow',
    props: {
        rowData: {
            type: Object,
            default: () => {
                return {};
            }
        },
        columns: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    methods: {
    }
};
</script>
