<script>
import YCheckbox from '@/components/checkbox';

export default {
    name: 'YTableHeaderRow',
    components: {
        YCheckbox
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
        }
    },
    data() {
        return {
            moveStatus: {}
        };
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
        },
        handleMouseMove(e, tindex, width) {
            if (this.moveStatus[tindex]) {
                let width = this.$refs.th[tindex].elm.offsetWidth - 2;
                let newWidth = width +
                    (e.clientX - (this.moveStatus[tindex].lastpostion || this.moveStatus[tindex].start));
                this.$refs.th[tindex].elm.style.width = newWidth + 'px';
                this.$refs.th[tindex].elm.style.minWidth = newWidth + 'px';
                this.$set(this.moveStatus, tindex, {
                    ...(this.moveStatus[tindex] || {}),
                    lastpostion: e.clientX
                });
            }
        },
        handleMouseUp(e, tindex) {
            if (this.moveStatus[tindex]) {
                delete this.moveStatus[tindex];
            }
        },
        handleMouseEnter(index) {
            Object.keys(this.moveStatus).forEach(key => {
                if (key !== index) {
                    delete this.moveStatus[key];
                }
            });
        },
        handleMouseDown(e, tindex) {
            this.$set(this.moveStatus, tindex, {
                ...(this.moveStatus[tindex] || {}),
                start: e.clientX
            });
        }
    },
    render(h) {
        let ths = [];
        ths.push(
            <th class="y-table-standard-cell"></th>
        );
        this.actionTable && !this.rindex && ths.push(
            <th class="y-table-action-cell" rowspan={this.level}>
                <div class="y-table_checkbox">
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
                <div class="y-table-column_drag-move-line-outter"
                    on-mousemove={ ($event) => this.handleMouseMove($event, tindex, th.width) }
                    on-mouseup={ ($event) => this.handleMouseUp($event, tindex, th.width) }>
                    <div class="y-table-column_drag-move-line"
                        on-mousedown={ ($event) => this.handleMouseDown($event, tindex) }>
                    </div>
                </div>
            );
            let thdom = <th
                colspan={th.colSpan} rowspan={th.rowSpan}
                style={this.headerCellStyle(th.width)}
                class={[th.fixed ? `y-table-cell_fixed-${th.fixed}` : '']}
                on-mouseenter={() => this.handleMouseEnter(tindex)}>
                <div class="y-table-cell">
                    { th.headRender.call(this, h, th.label, th) }
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
            &:nth-child(1) {
                border-left: none;
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
