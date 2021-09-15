<script>
import YCheckbox from '@/components/checkbox';

export default {
    name: 'YTableRow',
    components: {
        YCheckbox
    },
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
        },
        tableList: {
            type: Array,
            default: () => {
                return [];
            }
        },
        index: {
            type: Number,
            default: 0
        },
        actionTable: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        getRowspan(column) {
            let index = this.index;
            let rowspan = 1;
            let data = this.tableList;
            if (column.rowspan) {
                let key = column.columnKey;
                if (data[index - 1] && data[index][key] === data[index - 1][key]
                    && data[index]['$y_table_level'] === data[index - 1]['$y_table_level']) {
                    rowspan = 0;
                }
                else {
                    let i = index + 1;
                    rowspan = 1;
                    while (data[i] && data[i][key] === data[i - 1][key]
                        && data[i]['$y_table_level'] === data[i - 1]['$y_table_level']) {
                        rowspan++;
                        i++;
                    }
                }
            }
            return rowspan;
        },
    },
    render(h) {
        let tds = [];
        tds.push(
            <td class="y-table-standard-cell"></td>
        );
        this.actionTable && tds.push(
            <td class="y-table-action-cell">
                { this.rowData.$y_table_level }
                <div class="y-table_checkbox">
                    <y-checkbox />
                </div>
            </td>
        );
        this.columns.forEach((td, tindex) => {
            let rowspan = this.getRowspan(td);
            rowspan && tds.push(
                <td colspan={1} rowspan={rowspan}
                    class={[td.fixed ? `y-table-cell_fixed-${td.fixed}` : '']}>
                    <div class="y-table-cell">
                        { td.render.call(this, h, this.rowData[td.columnKey], this.rowData) }
                    </div>
                </td>
            );
        });
        return (
            <tr class="y-table-row">
                { tds }
            </tr>
        );
    }
};
</script>

<style lang="less">
    .y-table-row {
        td {
            border-bottom: 1px solid #e3f0ef;
        }
    }
</style>
