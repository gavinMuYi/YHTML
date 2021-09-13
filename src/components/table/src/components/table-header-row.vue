<script>
export default {
    name: 'YTableHeaderRow',
    props: {
        rowData: {
            type: Array,
            default: () => {
                return [];
            }
        },
        residue: {
            type: Number,
            default: 0
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
                        { th.headRender.call(this, h, th.label, th) }
                        {
                            this.residue === th.rowSpan && th.dragable
                                ? (
                                    <div class="y-table-column_drag-move-line"></div>
                                )
                                : ''
                        }
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

<style lang="less">
    .y-table-header {
        .y-table-column_drag-move-line {
            position: absolute;
            right: 0;
            display: none;
            height: 20px;
            width: 0;
            border: 1px solid #18b9ac5c;
        }
        th:hover {
            .y-table-column_drag-move-line {
                display: block;
                &:hover {
                    cursor: col-resize;
                }
            }
        }
    }
</style>
