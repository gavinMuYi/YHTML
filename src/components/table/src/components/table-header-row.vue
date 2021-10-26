<script>
import YCheckbox from '@/components/checkbox';
import YIcon from '@/components/icon';
import { throttle } from '@/utils/tools.js';

export default {
    name: 'YTableHeaderRow',
    components: {
        YCheckbox,
        YIcon
    },
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
        },
        level: {
            type: Number,
            default: 0
        },
        rindex: {
            type: Number,
            default: 0
        },
        actionTable: {
            type: Boolean,
            default: false
        },
        currentSort: {
            type: Object,
            default: () => {
                return {};
            }
        },
        defaultSort: {
            type: Object,
            default: () => {
                return {};
            }
        },
        name: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            moveStatus: {}
        };
    },
    methods: {
        sort(order, key, compare, columnIndex) {
            this.$emit('columnSort', order, key, compare, columnIndex);
        },
        extend(key, newStatus, index) {
            this.$emit('newExtendStatus', { key, newStatus, index });
        },
        handleMouseMove(e, tindex, th, width) {
            return (e) => {
                if (this.moveStatus[tindex]) {
                    let newWidth = width +
                        (e.clientX - this.moveStatus[tindex].start);
                    this.$refs.th[tindex].elm.style.width = newWidth + 'px';
                    this.$refs.th[tindex].elm.style.minWidth = newWidth + 'px';
                    if (this.$parent && this.$parent.$parent) {
                        this.$parent.$parent.setWidth(th, newWidth + 'px');
                    }
                    this.$set(this.moveStatus, tindex, {
                        ...(this.moveStatus[tindex] || {})
                    });
                }
            };
        },
        handleMouseUp(e, tindex) {
            if (this.moveStatus[tindex]) {
                delete this.moveStatus[tindex];
            }
        },
        handleMouseDown(e, tindex, th) {
            this.$set(this.moveStatus, tindex, {
                ...(this.moveStatus[tindex] || {}),
                start: e.clientX
            });
            let width = this.$refs.th[tindex].elm.offsetWidth;
            let moveEvent = throttle(this.handleMouseMove(e, tindex, th, width), 16);
            document.onselectstart = function () { return false };
            document.ondragstart = function () { return false };
            const handleMouseUp = () => {
                this.handleMouseUp(e, tindex);
                document.removeEventListener('mousemove', moveEvent);
                document.removeEventListener('mouseup', handleMouseUp);
                document.onselectstart = null;
                document.ondragstart = null;
            };
            document.addEventListener('mousemove', moveEvent);
            document.addEventListener('mouseup', handleMouseUp);
        }
    },
    render(h) {
        let ths = [];
        ths.push(
            <th class="y-table-standard-cell"></th>
        );
        this.actionTable && !this.rindex && ths.push(
            <th class="y-table-action-cell" rowspan={this.level}>
                <div class="y-table_checkbox" style="width: 100%">
                    <y-checkbox />
                </div>
            </th>
        );
        this.$refs = {
            th: [],
            line: []
        };
        this.rowData.forEach((th, tindex) => {
            let line = (
                <div class="y-table-column_drag-move-line-outter">
                    <div class="y-table-column_drag-move-line"
                        on-mousedown={ ($event) => this.handleMouseDown($event, tindex, th) }>
                    </div>
                </div>
            );
            let sorted = null;
            if (this.currentSort.key === th.columnKey && this.currentSort.columnIndex === tindex) {
                sorted = this.currentSort.order === 'asc' ? 'up' : 'down';
            }
            if (this.defaultSort.key && this.defaultSort.key === th.columnKey && th.sortable) {
                if (this.defaultSort.name) {
                    if (this.defaultSort.name === this.name && this.defaultSort.index === tindex) {
                        this.sort(this.defaultSort.order, th.columnKey, th.compare, tindex);
                    }
                } else {
                    this.sort(this.defaultSort.order, th.columnKey, th.compare, tindex);
                }
            }
            let sort = (
                <div class="y-table-column_sort-icon">
                    <y-icon name="arrow-up" class={['sort-up', sorted ? (sorted === 'up' ? 'sorted' : '') : '']}
                        on-click={() => { this.sort('asc', th.columnKey, th.compare, tindex) }} />
                    <y-icon name="arrow-down" class={['sort-down', sorted ? (sorted === 'down' ? 'sorted' : '') : '']}
                        on-click={() => { this.sort('desc', th.columnKey, th.compare, tindex) }} />
                </div>
            );
            let extendIcon = (
                <y-icon name={'arrow-' + (th.extend ? 'up' : 'down')}
                    on-click={() => { this.extend(th.columnKey, !th.extend, tindex) }} />
            );
            let thdom = <th
                colspan={th.colSpan} rowspan={th.rowSpan}
                class={[th.fixed ? `y-table-cell_fixed-${th.fixed}` : '']}>
                <div class="y-table-cell">
                    { th.withChildren ? extendIcon : '' }
                    { th.headRender.call(this, h, th.label, th) }
                    { th.sortable ? sort : '' }
                    {
                        this.residue === th.rowSpan && th.dragable
                            ? line
                            : ''
                    }
                </div>
            </th>;
            this.$refs.th.push(thdom);
            this.$refs.line.push(line);
            ths.push(thdom);
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
        .y-table-column_drag-move-line-outter {
            position: absolute;
            right: 0;
            padding: 3px;
            display: none;
            .y-table-column_drag-move-line {
                height: 20px;
                width: 2px;
                background: #18b9ac5c;
            }
        }
        th {
            border-bottom: 1px solid #ffffff;
            border-left: 1px solid #ffffff;
            box-sizing: border-box;
            &:nth-child(1) {
                border-left: none;
            }
            .y-table-column_sort-icon {
                width: 10px;
                height: 15px;
                margin-left: 5px;
                position: relative;
                .y-icon {
                    position: absolute;
                    margin-right: 5px;
                    fill: #a8abb3;
                    width: 9px;
                    height: 9px;
                    &:hover {
                        cursor: pointer;
                    }
                }
                .sort-up {
                    top: 0px;
                    left: 0px;
                }
                .sort-down {
                    bottom: 0px;
                    left: 0px;
                }
                .sorted {
                    fill: #18b9ac;
                }
            }
        }
        th:hover {
            .y-table-column_drag-move-line-outter {
                display: block;
                .y-table-column_drag-move-line:hover {
                    cursor: col-resize;
                }
            }
        }
    }
</style>
