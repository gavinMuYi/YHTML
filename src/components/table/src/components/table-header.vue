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
    },
    render(h) {
        this.$refs.tr = [];
        return (
            <thead class="y-table-header">
                {this.columns.map((row, rindex) => {
                    let tr = (
                        <tr>
                            {row.map((th, tindex) => {
                                return (
                                    <th
                                        colspan={th.colSpan} rowspan={th.rowSpan}
                                        style={this.headerCellStyle(th.width)}
                                        class={[th.fixed ? `y-table-cell_fixed-${th.fixed}` : '']}>
                                        <div class="y-table-cell">
                                            { th.headRender.call(this, h, th.label) }
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    );
                    this.$refs.tr.push(tr);
                    return tr;
                })}
            </thead>
        );
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
