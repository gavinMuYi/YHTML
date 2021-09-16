<script>
import clone from 'clone';
import YTableRow from './table-row';

export default {
    name: 'YTableBody',
    components: {
        YTableRow
    },
    props: {
        columns: {
            type: Array,
            default: () => {
                return [];
            }
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
        tableList: {
            type: Array,
            default: () => {
                return [];
            }
        },
        rows: {
            type: Array,
            default: () => {
                return [];
            }
        },
        actionTable: {
            type: Boolean,
            default: false
        },
        maps: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    data() {
        return {
        };
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
        }
    },
    render(h) {
        this.$refs.tr = [];
        let trs = [];
        let flat = (arr, pre, position) => {
            arr.forEach((row, rindex) => {
                let rowPosition = clone(position);
                rowPosition.push(rindex);
                let trDom = <y-table-row
                    position={rowPosition}
                    rowData={this.rows[this.maps[pre + '-' + rindex]]} columns={this.columns}
                    index={this.maps[pre + '-' + rindex]} actionTable={this.actionTable}
                    tableList={this.rows} style={this.rowStyle(this.maps[pre + '-' + rindex])} />;
                this.$refs.tr.push(trDom);
                trs.push(trDom);
                if (row.children && row.children.length && row.extend) {
                    flat(row.children, pre + '-' + rindex, rowPosition);
                }
            });
        };
        flat(this.tableList, '0', []);
        return <tbody class="y-table-body">
            { trs }
        </tbody>;
    }
};
</script>

<style lang="less">
    .y-table-body {
        .y-table-cell {
            min-height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>
