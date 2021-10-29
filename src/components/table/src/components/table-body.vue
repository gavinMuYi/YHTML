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
        },
        currentHoverRow: {
            type: Number,
            default: null
        },
        name: {
            type: String,
            default: ''
        },
        multiple: {
            type: Boolean,
            default: false
        },
        widthLeft: {
            type: Boolean,
            default: false
        },
        checkBoxStatus: {
            type: Object,
            default: () => {
                return {};
            }
        },
        allSelected: {
            type: Boolean,
            default: false
        },
        basicIndex: {
            type: String,
            default: ''
        },
        stripe: {
            type: Boolean,
            default: false
        },
        setRowClass: {
            type: Function,
            default: null
        },
        colspanKeys: {
            type: Array,
            default: () => {
                return [];
            }
        }
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
        },
        handleHover(index) {
            this.$emit('hover', index);
        },
        handleHoverOut(index) {
            this.$emit('hoverout', index);
        },
        handleClick(rowData) {
            this.$emit('rowClick', rowData);
        },
        handleSelect(rowData) {
            this.$emit('select', rowData);
        },
        allSelectToast() {
            this.$emit('allSelectToast');
        }
    },
    render(h) {
        this.$refs.tr = [];
        let trs = [];
        let flat = (arr, pre, position, checkBoxStatus) => {
            arr.forEach((row, rindex) => {
                let rowPosition = clone(position);
                rowPosition.push(rindex);
                let rowData = this.rows[this.maps[pre + '-' + rindex]];
                let trDom = <y-table-row
                    setRowClass={this.setRowClass} colspanKeys={this.colspanKeys}
                    checkBoxStatus={this.basicIndex && checkBoxStatus[rowData[this.basicIndex]]
                        ? checkBoxStatus[rowData[this.basicIndex]].tracked : ''}
                    multiple={this.multiple} widthLeft={this.widthLeft}
                    position={rowPosition} currentHoverRow={this.currentHoverRow}
                    rowData={rowData} columns={this.columns} allSelected={this.allSelected}
                    index={this.maps[pre + '-' + rindex]} actionTable={this.actionTable}
                    tableList={this.rows} style={this.rowStyle(this.maps[pre + '-' + rindex])}
                    on-hover={($event) => { this.handleHover($event) }} name={this.name}
                    on-hoverout={($event) => { this.handleHoverOut($event) }}
                    on-rowClick={($event) => { this.handleClick($event) }}
                    on-allSelectToast={() => { this.allSelectToast() }}
                    on-select={($event) => { this.handleSelect($event) }} />;
                this.$refs.tr.push(trDom);
                trs.push(trDom);
                if (row.children && row.children.length && row.extend) {
                    flat(row.children, pre + '-' + rindex, rowPosition,
                        this.basicIndex && checkBoxStatus[rowData[this.basicIndex]]
                            ? (checkBoxStatus[rowData[this.basicIndex]].children || {})
                            : {}
                    );
                }
            });
        };
        flat(this.tableList, '0', [], this.checkBoxStatus);
        return <tbody class={['y-table-body', this.stripe ? 'y-table-stripe_body' : '']}>
            { trs }
        </tbody>;
    }
};
</script>

<style lang="less">
    .y-table-body {
        .y-table-row_hover {
            background: #cbf9f15c;
            cursor: pointer;
        }
        .y-table-cell {
            min-height: 50px;
        }
    }
    .y-table-stripe_body {
        .y-table-row:nth-child(2n) {
            background: #f7f7f7;
        }
        .y-table-row_hover:nth-child(2n + 1) {
            background: #cbf9f15c;
            cursor: pointer;
        }
        .y-table-row_hover:nth-child(2n) {
            background: #dee1e170;
            cursor: pointer;
        }
    }
</style>
