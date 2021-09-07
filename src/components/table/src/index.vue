<template>
    <div class="y-table">
        <div class="y-table-hidden">
            <slot>
                <y-table-column
                    v-for="(column, index) in columnConfig" :key="column.key + index"
                    :highlight="highlight" :columnKey="column.key"
                    :width="column.width" :label="column.label"
                    :fixed="column.fixed" />
            </slot>
            <y-table-data :lazyLoad="fetchFunc" />
            {{ rowHeight }}
        </div>
        <!-- <div class="y-table-left" v-if="rowColumn.rowColumnLeft.length" :style="`width: ${leftTableWidth}`">
            <table>
                <y-table-header :columns="headerColumn.hearderColumnLeft" />
                <y-table-body :columns="rowColumn.rowColumnLeft" />
            </table>
        </div> -->
        <div class="y-table-center">
            <table ref="center">
                <y-table-header :columns="headerColumn" ref="centerHeader" />
                <y-table-body :columns="rowColumn" ref="centerBody" />
            </table>
        </div>
        <!-- <div class="y-table-right" v-if="rowColumn.rowColumnRight.length" :style="`width: ${rightTableWidth}`">
            <table>
                <y-table-header :columns="headerColumn.hearderColumnRight" />
                <y-table-body :columns="rowColumn.rowColumnRight" />
            </table>
        </div> -->
    </div>
</template>

<script>
import { EleResize } from '@/utils/dom.js';
import YTableColumn from './components/table-column';
import YTableBody from './components/table-body';
import YTableHeader from './components/table-header';
import YTableData from './components/table-data';

export default {
    name: 'YTable',
    components: {
        YTableColumn,
        YTableHeader,
        YTableBody,
        YTableData
    },
    props: {
        options: {
            type: Array,
            default: null
        },
        lazyLoad: {
            type: Function,
            default: () => {
                return new Promise((resolve, reject) => {
                    resolve();
                }).then(() => {
                    return [];
                });
            }
        },
        count: {
            type: Number,
            default: -1
        },
        multiple: {
            type: Boolean,
            default: false
        },
        columnConfig: {
            type: Array,
            default: () => {
                return [];
            }
        },
        highlight: {
            type: String,
            default: ''
        },
        scrollTable: {
            type: Boolean,
            default: false
        },
        contentMaxHeight: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            name: 'VTable',
            index: 1,
            fetchFunc: this.initLoad(),
            total: 0,
            column: [],
            leftTable: {
                header: [],
                body: []
            },
            centerTable: {
                header: [],
                body: []
            },
            rightTable: {
                header: [],
                body: []
            }
        };
    },
    computed: {
        headerDeep() {
            let deep = 1;
            let recursion = (arr, level) => {
                arr.forEach(item => {
                    if (item.children && item.children.length) {
                        recursion(item.children, level + 1);
                        level + 1 > deep && (deep = level + 1);
                    }
                });
            };
            recursion(this.column, 1);
            return deep;
        },
        headerColumn() {
            let hearderColumn = [];
            let hearderColumnLeft = [];
            let hearderColumnRight = [];
            let getColSpan = (column) => {
                if (column.children && column.children.length) {
                    let colspan = 0;
                    let recursion = (arr) => {
                        arr.forEach(item => {
                            if (item.children && item.children.length) {
                                recursion(item.children);
                            } else {
                                colspan++;
                            }
                        });
                    };
                    recursion(column.children);
                    return colspan;
                } else {
                    return 1;
                }
            };
            let recursion = (arr, level, fixed) => {
                if (!hearderColumn[level]) {
                    hearderColumn[level] = [];
                }
                if (!hearderColumnLeft[level]) {
                    hearderColumnLeft[level] = [];
                }
                if (!hearderColumnRight[level]) {
                    hearderColumnRight[level] = [];
                }
                arr.forEach(item => {
                    let { children, ...orgs } = item;
                    let cell = {
                        ...orgs,
                        rowSpan: item.children && item.children.length ? 1 : this.headerDeep - level,
                        colSpan: getColSpan(item)
                    };
                    if (!(fixed || item.fixed)) {
                        hearderColumn[level].push(cell);
                    } else {
                        if ((fixed || item.fixed) === 'left') {
                            hearderColumnLeft[level].push(cell);
                        } else {
                            hearderColumnRight[level].push(cell);
                        }
                    }
                    if (children && children.length) {
                        recursion(children, level + 1, (fixed || item.fixed));
                    }
                });
            };
            recursion(this.column, 0);
            let res = [];
            hearderColumn.forEach((row, index) => {
                res.push([]);
                res[index] = res[index].concat(hearderColumnLeft[index].map(col => {
                    return {
                        ...col,
                        fixed: 'left'
                    };
                }));
                res[index] = res[index].concat(hearderColumn[index]);
                res[index] = res[index].concat(hearderColumnRight[index].map(col => {
                    return {
                        ...col,
                        fixed: 'right'
                    };
                }));
            });
            return res;
        },
        rowColumn() {
            let rowColumn = [];
            let rowColumnLeft = [];
            let rowColumnRight = [];
            let getColumn = (arr, fixed) => {
                arr.forEach(column => {
                    let { children, ...orgs } = column;
                    if (children && children.length) {
                        getColumn(children, fixed || column.fixed);
                    } else {
                        if (!(fixed || column.fixed)) {
                            rowColumn.push(orgs);
                        } else {
                            if ((fixed || column.fixed) === 'left') {
                                rowColumnLeft.push(orgs);
                            } else {
                                rowColumnRight.push(orgs);
                            }
                        }
                    }
                });
            };
            getColumn(this.column);
            let res = [];
            res = res.concat(rowColumnLeft.map(col => {
                return {
                    ...col,
                    fixed: 'left'
                };
            }));
            res = res.concat(rowColumn);
            res = res.concat(rowColumnRight.map(col => {
                return {
                    ...col,
                    fixed: 'right'
                };
            }));
            return res;
        },
        rowHeight() {
            return {
                header: this.centerTable.header.map((val, index) => {
                    return Math.max(
                        this.leftTable.header[index] || 0,
                        this.centerTable.header[index],
                        this.rightTable.header[index] || 0
                    );
                }),
                body: this.centerTable.body.map((val, index) => {
                    return Math.max(
                        this.leftTable.body[index] || 0,
                        this.centerTable.body[index],
                        this.rightTable.body[index] || 0
                    );
                })
            };
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.handleResize('center')();
        });
        EleResize.on(this.$refs.center, this.handleResize('center'), this);
    },
    methods: {
        initLoad() {
            return this.options
                ? (index, count) => {
                    return new Promise((resolve, reject) => {
                        resolve();
                    }).then(() => {
                        return {
                            options: this.count > -1
                                ? this.options.slice((index - 1) * count, index * count)
                                : this.options,
                            total: this.options.length
                        };
                    });
                } : this.lazyLoad;
        },
        handleResize(DomKey) {
            return () => {
                let headerRow = this.$refs[DomKey + 'Header'].$refs.tr;
                let bodyRow = this.$refs[DomKey + 'Body'].$refs.tr;
                let headerRowHeight = headerRow.map(row => {
                    return row.elm.offsetHeight;
                });
                let BodyRowHeight = bodyRow.map(row => {
                    return row.$el.offsetHeight;
                });
                this.$set(this[DomKey + 'Table'], 'header', headerRowHeight);
                this.$set(this[DomKey + 'Table'], 'body', BodyRowHeight);
            };
        }
    }
};
</script>

<style lang="less">
    .y-table {
        .y-table-hidden {
            width: 0px;
            height: 0px;
            overflow: hidden;
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
        }
        table {
            border-spacing: 1px;
            table-layout: fixed;
            word-break:break-all;
            .y-table-cell {
                font-size: 14px;
                font-weight: 400;
                overflow: hidden;
            }
        }
        .y-table-center {
            min-width: 100%;
            overflow: auto;
            table {
                min-width: 100%;
            }
        }
    }
</style>
