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
        position: {
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
        },
        currentHoverRow: {
            type: Number,
            default: null
        },
        name: {
            type: String,
            default: ''
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
                    && (!data[index].children || !data[index].children.length)
                    && (!data[index - 1].children || !data[index - 1].children.length)) {
                    rowspan = 0;
                }
                else {
                    let i = index + 1;
                    rowspan = 1;
                    while (data[i] && data[i][key] === data[i - 1][key]
                        && (!data[i].children || !data[i].children.length)
                        && (!data[i - 1].children || !data[i - 1].children.length)) {
                        rowspan++;
                        i++;
                    }
                }
            }
            return rowspan;
        },
        handleHover(index) {
            this.$emit('hover', index);
        },
        handleHoverOut(index) {
            this.$emit('hoverout', index);
        },
        handleClick() {
            this.$emit('rowClick', {
                ...this.rowData,
                $y_table_position: this.position
            });
        }
    },
    render(h) {
        let tds = [];
        tds.push(
            <td class="y-table-standard-cell"></td>
        );
        let rowSlot = this.$parent.$parent.$scopedSlots['row' + this.rowData.$y_table_level];
        this.actionTable && tds.push(
            <td class="y-table-action-cell">
                <div style={'display: flex;'}>
                    <div
                        style={{
                            width: '0px',
                            marginLeft: 20 * (this.rowData.$y_table_level - 1) + 'px'
                        }}>
                    </div>
                    <div class="y-table_checkbox">
                        <span on-click={($event) => { $event.stopPropagation() }}>
                            <y-checkbox />
                        </span>
                    </div>
                </div>
            </td>
        );
        if (!this.actionTable) {
            if (rowSlot) {
                tds.push(<td colspan={this.columns.length}>
                    <div class="y-table-cell">
                        { rowSlot({
                            name: this.name
                        }) }
                    </div>
                </td>
                );
            } else {
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
            }
        }
        return (
            <tr class="y-table-row"
                style={this.currentHoverRow === this.index ? { background: '#cbf9f15c' } : {}}
                on-mouseenter={() => { this.handleHover(this.index) }}
                on-mouseleave={() => { this.handleHoverOut(this.index) }}
                on-click={() => { this.handleClick() }}>
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
            box-sizing: border-box;
        }
    }
</style>
