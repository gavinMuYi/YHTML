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
    render(h) {
        let tds = [];
        tds.push(
            <td class="y-table-standard-cell"></td>
        );
        this.columns.forEach((td, tindex) => {
            tds.push(
                <td colspan={1} rowspan={1}
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
