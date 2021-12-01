<script>
import clone from 'clone';
import YCheckbox from '@/components/checkbox';
import YIcon from '@/components/icon';

export default {
    name: 'YTableRow',
    components: {
        YCheckbox,
        YIcon
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
        },
        multiple: {
            type: Boolean,
            default: false
        },
        widthLeft: {
            type: Boolean,
            default: false
        },
        allSelected: {
            type: Boolean,
            default: false
        },
        checkBoxStatus: {
            type: String,
            default: ''
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
        },
        transverseTreeTable: {
            type: Boolean,
            default: false
        },
        transverseTreeTableColumns: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    methods: {
        getRowspan(column) {
            let index = this.index;
            let rowspan = 1;
            let data = this.tableList;
            if (column.rowspan) {
                let key = column.columnKey;
                if (this.transverseTreeTable && key === this.transverseTreeTableColumns[0]) {
                    let minus = index;
                    while (data[minus - 1] && data[index][key] === data[minus - 1][key] && rowspan) {
                        if (!data[minus - 1].extend) {
                            rowspan = 0;
                        }
                        minus--;
                    }
                    if (rowspan && !data[index].extend) {
                        let add = index;
                        while (data[add + 1] && data[add][key] === data[add + 1][key]) {
                            if (!data[add + 1].extend) {
                                rowspan++;
                            }
                            add++;
                        }
                    }
                } else {
                    if (data[index - 1] && data[index][key] === data[index - 1][key]
                        && (!data[index].children || !data[index].children.length)
                        && (!data[index - 1].children || !data[index - 1].children.length)
                        && !data[index].hasChildren && !data[index - 1].hasChildren) {
                        rowspan = 0;
                    }
                    else {
                        let i = index + 1;
                        rowspan = 1;
                        while (data[i] && data[i][key] === data[i - 1][key]
                            && (!data[i].children || !data[i].children.length)
                            && (!data[i - 1].children || !data[i - 1].children.length)
                            && !data[i].hasChildren && !data[i - 1].hasChildren) {
                            rowspan++;
                            i++;
                        }
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
        },
        handleOpen() {
            this.$emit('rowOpen', {
                $y_table_position: this.position
            });
        },
        handleClose(index) {
            let fatherPosition = clone(this.position);
            fatherPosition.length = index + 1;
            this.$emit('rowOpen', {
                $y_table_position: fatherPosition
            });
        },
        handleSelect() {
            this.$emit('select', {
                ...this.rowData,
                $y_table_position: this.position
            });
        },
        allSelectToast() {
            this.$emit('allSelectToast');
        }
    },
    render(h) {
        let tds = [];
        let hoverClassName = this.setRowClass && this.setRowClass(this.rowData, this.index)
            ? this.setRowClass(this.rowData, this.index) + '_hover' : 'y-table-row_hover';
        tds.push(
            <td class="y-table-standard-cell"></td>
        );
        let rowSlot = this.$parent.$parent.$scopedSlots['row' + this.rowData.$y_table_level];
        let icon = this.multiple && !this.name
            && (this.rowData.hasChildren || (this.rowData.children && this.rowData.children.length))
            ? <span class="y-table-row_icon-box"><y-icon name={this.rowData.loading
                ? 'loading'
                : `arrow-${this.rowData.extend ? 'minus' : 'add'}`}
            class="y-table-row_icon" /></span>
            : '';
        this.actionTable && tds.push(
            <td class="y-table-action-cell">
                <div style={'display: flex;'}>
                    <div
                        style={{
                            width: '0px',
                            marginLeft: 20 * (this.rowData.$y_table_level - 1) + 'px'
                        }}>
                    </div>
                    <div class={ ['y-table_checkbox', this.allSelected ? 'allselect-disable' : ''] }
                        on-click={($event) => { $event.stopPropagation(); this.allSelectToast() }} >
                        <span on-click={($event) => { $event.stopPropagation(); this.handleSelect() }}>
                            <y-checkbox status={ this.allSelected ? 'all' : this.checkBoxStatus }/>
                        </span>
                    </div>
                    { icon }
                </div>
            </td>
        );
        let transverseCheckbox = (<span class={ [
            'y-table_checkbox_transverse',
            this.allSelected ? 'allselect-disable' : ''
        ] }
        on-click={($event) => { $event.stopPropagation(); this.allSelectToast() }} >
            <span on-click={($event) => { $event.stopPropagation(); this.handleSelect() }}>
                <y-checkbox status={ this.allSelected ? 'all' : this.checkBoxStatus }/>
            </span>
        </span>);
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
                if (this.colspanKeys.length) {
                    let rowSpans = [];
                    this.columns.forEach((td, tindex) => {
                        let rowspan = this.getRowspan(td);
                        rowSpans.push(rowspan);
                    });
                    let canSpan = (a, b, rsa, rsb) => {
                        let aKey = a.columnKey;
                        let bKey = b.columnKey;
                        let canspan = false;
                        this.colspanKeys.forEach(group => {
                            if (group.indexOf(aKey) > -1 && group.indexOf(bKey) > -1
                            && this.rowData[aKey] === this.rowData[bKey] && rsa === rsb) {
                                canspan = true;
                            }
                        });
                        return canspan;
                    };
                    this.columns.forEach((td, tindex) => {
                        let icon = !this.multiple && !tindex && (this.name === 'left'
                            || (this.name === 'center' && !this.widthLeft))
                            && (this.rowData.hasChildren || (this.rowData.children && this.rowData.children.length))
                            ? <y-icon name={this.rowData.loading
                                ? 'loading'
                                : `arrow-${this.rowData.extend ? 'minus' : 'add'}`}
                            class="y-table-row_icon" />
                            : '';
                        if (this.transverseTreeTable) {
                            let currentIndex = this.transverseTreeTableColumns.indexOf(td.columnKey);
                            if (currentIndex > -1 && currentIndex === this.rowData.$y_table_level - 1
                            && (this.rowData.hasChildren || (this.rowData.children && this.rowData.children.length))) {
                                icon = (
                                    <span>
                                        <y-icon name={this.rowData.loading
                                            ? 'loading'
                                            : 'arrow-add'}
                                        class="y-table-row_icon"
                                        on-click={() => { this.handleOpen() }} />
                                        { this.multiple ? transverseCheckbox : ''}
                                    </span>
                                );
                            } else if (currentIndex > -1 && currentIndex < this.rowData.$y_table_level - 1) {
                                icon = (
                                    <span>
                                        <y-icon
                                            name="arrow-minus"
                                            class="y-table-row_icon"
                                            on-click={() => { this.handleClose(currentIndex) }} />
                                        { this.multiple ? transverseCheckbox : ''}
                                    </span>
                                );
                            } else if (currentIndex > -1 && currentIndex === this.rowData.$y_table_level - 1
                                && this.multiple
                                && !(this.rowData.hasChildren
                                || (this.rowData.children && this.rowData.children.length))) {
                                icon = (
                                    <span>
                                        { this.multiple ? transverseCheckbox : ''}
                                    </span>
                                );
                            } else {
                                icon = '';
                            }
                        }
                        let rowspan = rowSpans[tindex];
                        let colspan = 1;
                        if (rowspan) {
                            if (rowSpans[tindex - 1] && rowSpans[tindex] === rowSpans[tindex - 1]) {
                                if (canSpan(this.columns[tindex - 1], this.columns[tindex],
                                    rowSpans[tindex - 1], rowSpans[tindex])) {
                                    colspan = 0;
                                }
                            }
                            if (colspan && rowSpans[tindex + 1] && rowSpans[tindex] === rowSpans[tindex + 1]) {
                                let start = tindex;
                                let a = this.columns[start];
                                let b = this.columns[start + 1];
                                while (a && b && canSpan(a, b, rowSpans[start], rowSpans[start + 1])) {
                                    colspan++;
                                    start++;
                                    a = this.columns[start];
                                    b = this.columns[start + 1];
                                }
                            }
                        }
                        rowspan && colspan && tds.push(
                            <td colspan={colspan} rowspan={rowspan}
                                class={[td.fixed ? `y-table-cell_fixed-${td.fixed}` : '']}>
                                <div class={['y-table-cell', `y-table-cell_${td.align}`]} style={
                                    {
                                        marginLeft: !this.transverseTreeTable
                                        && !this.multiple && !tindex && (this.name === 'left'
                                        || (this.name === 'center' && !this.widthLeft))
                                            ? 20 * (this.rowData.$y_table_level - 1) + 'px'
                                            : 0
                                    }
                                }>
                                    { icon }
                                    <span class="y-table-cell_content">
                                        { td.render.call(this, h, this.rowData[td.columnKey], {
                                            ...this.rowData,
                                            rowIndex: this.index
                                        }) }
                                    </span>
                                </div>
                            </td>
                        );
                    });
                } else {
                    this.columns.forEach((td, tindex) => {
                        let icon = !this.multiple && !tindex && (this.name === 'left'
                            || (this.name === 'center' && !this.widthLeft))
                            && (this.rowData.hasChildren || (this.rowData.children && this.rowData.children.length))
                            ? <y-icon name={this.rowData.loading
                                ? 'loading'
                                : `arrow-${this.rowData.extend ? 'minus' : 'add'}`}
                            class="y-table-row_icon" />
                            : '';
                        if (this.transverseTreeTable) {
                            let currentIndex = this.transverseTreeTableColumns.indexOf(td.columnKey);
                            if (currentIndex > -1 && currentIndex === this.rowData.$y_table_level - 1
                            && (this.rowData.hasChildren || (this.rowData.children && this.rowData.children.length))) {
                                icon = (
                                    <span>
                                        <y-icon name={this.rowData.loading
                                            ? 'loading'
                                            : 'arrow-add'}
                                        class="y-table-row_icon"
                                        on-click={() => { this.handleOpen() }}
                                        on-click={() => { this.handleClose(currentIndex) }} />
                                        { this.multiple ? transverseCheckbox : ''}
                                    </span>
                                );
                            } else if (currentIndex > -1 && currentIndex < this.rowData.$y_table_level - 1) {
                                icon = (
                                    <span>
                                        <y-icon
                                            name="arrow-minus"
                                            class="y-table-row_icon" />
                                        { this.multiple ? transverseCheckbox : ''}
                                    </span>
                                );
                            } else if (currentIndex > -1 && currentIndex === this.rowData.$y_table_level - 1
                                && this.multiple
                                && !(this.rowData.hasChildren
                                || (this.rowData.children && this.rowData.children.length))) {
                                icon = (
                                    <span>
                                        { this.multiple ? transverseCheckbox : ''}
                                    </span>
                                );
                            } else {
                                icon = '';
                            }
                        }
                        let rowspan = this.getRowspan(td);
                        rowspan && tds.push(
                            <td colspan={1} rowspan={rowspan}
                                class={[td.fixed ? `y-table-cell_fixed-${td.fixed}` : '']}>
                                <div class={['y-table-cell', `y-table-cell_${td.align}`]} style={
                                    {
                                        marginLeft: !this.transverseTreeTable
                                        && !this.multiple && !tindex && (this.name === 'left'
                                        || (this.name === 'center' && !this.widthLeft))
                                            ? 20 * (this.rowData.$y_table_level - 1) + 'px'
                                            : 0
                                    }
                                }>
                                    { icon }
                                    <span class="y-table-cell_content">
                                        { td.render.call(this, h, this.rowData[td.columnKey], {
                                            ...this.rowData,
                                            rowIndex: this.index
                                        }) }
                                    </span>
                                </div>
                            </td>
                        );
                    });
                }
            }
        }
        return (
            <tr class={['y-table-row', this.currentHoverRow === this.index
                && (this.rowData.hasChildren || (this.rowData.children && this.rowData.children.length))
                ? hoverClassName : '', this.setRowClass ? this.setRowClass(this.rowData, this.index) : '']}
            on-mouseenter={() => { if (!this.transverseTreeTable) this.handleHover(this.index); }}
            on-mouseleave={() => { if (!this.transverseTreeTable) this.handleHoverOut(this.index); }}
            on-click={() => { if (!this.transverseTreeTable) this.handleClick(); }}>
                { tds }
            </tr>
        );
    }
};
</script>

<style lang="less">
    .y-table-row {
        td {
            border-bottom: 1px solid @gray;
            box-sizing: border-box;
            .allselect-disable {
                span {
                    opacity: 0.5;
                    pointer-events: none;
                }
            }
            .y-table-cell_content {
                flex: 1;
            }
            .y-table_checkbox_transverse {
                display: inline-block;
                position: relative;
                top: 2px;
                margin-right: 5px;
            }
            .y-table-row_icon {
                position: relative;
                top: 1px;
            }
        }
    }
    .y-table-action-cell {
        .y-table-row_icon-box {
            .y-table-row_icon {
                position: relative;
                top: 0px;
            }
        }
    }
</style>
