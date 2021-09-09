<script>
export default {
    name: 'YTableHeader',
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
        let trDom = [];
        for (let rindex = 0; rindex < this.level; rindex++) {
            let ths = [];
            ths.push(
                <th class="y-table-standard-cell"></th>
            );
            this.columns[rindex].forEach((th, tindex) => {
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
            let rowStyle = {};
            if (this.rowHeight[rindex]) {
                rowStyle = {
                    height: this.selfRowHeight[rindex] < this.rowHeight[rindex]
                        ? this.rowHeight[rindex] + 3 + 'px'
                        : this.rowHeight[rindex] + 2 + 'px'
                };
            }
            let tr = this.columns[rindex] ? (
                <tr style={rowStyle}>
                    { ths }
                </tr>
            ) : (
                <tr style={rowStyle}>
                    <th class="y-table-standard-cell"></th>
                </tr>
            );
            trDom.push(tr);
            this.$refs.tr.push(tr);
        }
        return (
            <thead class="y-table-header">
                { trDom }
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
