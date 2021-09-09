<script>
export default {
    name: 'YTableHeaderRow',
    props: {
        rowData: {
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
    },
    render(h) {
        let ths = [];
        ths.push(
            <th class="y-table-standard-cell"></th>
        );
        this.rowData.forEach((th, tindex) => {
            ths.push(
                <th
                    colspan={th.colSpan} rowspan={th.rowSpan}
                    style={this.headerCellStyle(th.width)}
                    class={[th.fixed ? `y-table-cell_fixed-${th.fixed}` : '']}>
                    <div class="y-table-cell">
                        { th.headRender.call(this, h, th.label) }
                    </div>
                </th>
            );
        });
        return (
            <tr>
                { ths }
            </tr>
        );
    }
};
</script>
