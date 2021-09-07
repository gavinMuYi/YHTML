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
        return (
            <tr class="y-table-row">
                {this.columns.map((td, tindex) => {
                    return (
                        <td colspan={1} rowspan={1}
                            class={[td.fixed ? `y-table-cell_fixed-${td.fixed}` : '']}>
                            <div class="y-table-cell">
                                { td.render.call(this, h, this.rowData[td.columnKey], this.rowData) }
                            </div>
                        </td>
                    );
                })}
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
