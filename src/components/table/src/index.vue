<template>
    <div class="y-table">
        <div class="y-table-content">
            <div class="y-table-hidden">
                <slot>
                    <y-table-column
                        v-for="(column, index) in columnConfig" :key="column.key + index"
                        :highlight="highlight" :columnKey="column.key"
                        :width="column.width" :label="column.label"
                        :fixed="column.fixed" />
                </slot>
                <y-table-data :lazyLoad="fetchFunc" :index="index" :count="count"
                              @updateTotal="updateTotal" @updateTableList="updateTableList" />
                <y-table-standard :standardTable="standardTable" @rowHeightChange="rowHeightChange" />
            </div>
            <div class="y-table-left"
                 v-if="rowColumn.rowColumnLeft.length" :style="{
                     minWidth: `${leftTableWidth}`,
                     width: `${leftTableWidth}`
            }">
                <table ref="left" style="width: 100%;">
                    <y-table-header :columns="headerColumn.headerColumnLeft" ref="leftHeader" :level="headerDeep"
                                    :rowHeight="rowHeight.header" :selfRowHeight="leftTable.header" />
                    <y-table-body :columns="rowColumn.rowColumnLeft" ref="leftBody" :rowHeight="rowHeight.body"
                                  :selfRowHeight="leftTable.body" :tableList="tableList" />
                </table>
            </div>
            <div class="y-table-center">
                <table ref="center">
                    <y-table-header :columns="headerColumn.headerColumn" ref="centerHeader" :level="headerDeep"
                                    :rowHeight="rowHeight.header" :selfRowHeight="centerTable.header" />
                    <y-table-body :columns="rowColumn.rowColumn" ref="centerBody" :rowHeight="rowHeight.body"
                                  :selfRowHeight="centerTable.body" :tableList="tableList" />
                </table>
            </div>
            <div class="y-table-right"
                 v-if="rowColumn.rowColumnRight.length" :style="{
                     minWidth: `${rightTableWidth}`,
                     width: `${rightTableWidth}`
            }">
                <table ref="right" style="width: 100%;">
                    <y-table-header :columns="headerColumn.headerColumnRight" ref="rightHeader" :level="headerDeep"
                                    :rowHeight="rowHeight.header" :selfRowHeight="rightTable.header" />
                    <y-table-body :columns="rowColumn.rowColumnRight" ref="rightBody" :rowHeight="rowHeight.body"
                                  :selfRowHeight="rightTable.body" :tableList="tableList" />
                </table>
            </div>
        </div>
        <y-pagination
            v-if="!scrollTable"
            :total="total" :index="index" :countOptions="countOptions"
            @change="hanlePagination"/>
    </div>
</template>

<script>
import { EleResize } from '@/utils/dom.js';
import YPagination from '@/components/pagination';
import YTableColumn from './components/table-column';
import YTableBody from './components/table-body';
import YTableHeader from './components/table-header';
import YTableData from './components/table-data';
import YTableStandard  from './components/table-standard';

export default {
    name: 'YTable',
    components: {
        YPagination,
        YTableColumn,
        YTableHeader,
        YTableBody,
        YTableData,
        YTableStandard
    },
    props: {
        options: {
            type: Array,
            default: null
        },
        lazyLoad: {
            type: Function,
            default: (index, count) => {
                return new Promise((resolve, reject) => {
                    resolve();
                }).then(() => {
                    return {
                        options: [],
                        total: 0
                    };
                });
            }
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
        },
        countOptions: {
            type: Array,
            default: () => {
                return [15, 30, 50, 100];
            }
        }
    },
    data() {
        return {
            name: 'VTable',
            fetchFunc: this.initLoad(),
            index: 1,
            count: this.countOptions[0] || 15,
            total: 0,
            tableList: [],
            column: [],
            leftTable: {
                headerMax: 0,
                header: [],
                body: []
            },
            centerTable: {
                headerMax: 0,
                header: [],
                body: []
            },
            rightTable: {
                headerMax: 0,
                header: [],
                body: []
            },
            standardTable: {
                header: [],
                body: []
            },
            rowHeight: {
                header: [],
                body: []
            }
        };
    },
    computed: {
        headerColumn() {
            let headerColumn = [];
            let headerColumnLeft = [];
            let headerColumnRight = [];
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
                if (!headerColumn[level]) {
                    headerColumn[level] = [];
                }
                if (!headerColumnLeft[level]) {
                    headerColumnLeft[level] = [];
                }
                if (!headerColumnRight[level]) {
                    headerColumnRight[level] = [];
                }
                arr.forEach(item => {
                    let { children, ...orgs } = item;
                    let cell = {
                        ...orgs,
                        rowSpan: item.children && item.children.length ? 1 : this.headerDeep - level,
                        colSpan: getColSpan(item)
                    };
                    if (!(fixed || item.fixed)) {
                        headerColumn[level].push(cell);
                    } else {
                        if ((fixed || item.fixed) === 'left') {
                            headerColumnLeft[level].push(cell);
                        } else {
                            headerColumnRight[level].push(cell);
                        }
                    }
                    if (children && children.length) {
                        recursion(children, level + 1, (fixed || item.fixed));
                    }
                });
            };
            recursion(this.column, 0);
            let res = [];
            headerColumn.forEach((row, index) => {
                res.push([]);
                res[index] = res[index].concat(headerColumnLeft[index].map(col => {
                    return {
                        ...col,
                        fixed: 'left'
                    };
                }));
                res[index] = res[index].concat(headerColumn[index]);
                res[index] = res[index].concat(headerColumnRight[index].map(col => {
                    return {
                        ...col,
                        fixed: 'right'
                    };
                }));
            });
            return {
                allcloumns: res,
                headerColumn,
                headerColumnLeft,
                headerColumnRight
            };
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
            this.$nextTick(() => {
                this.handleResize('center')();
                EleResize.on(this.$refs.center, this.handleResize('center'), this);
            });
            if (rowColumnLeft.length) {
                this.$nextTick(() => {
                    this.handleResize('left')();
                    EleResize.on(this.$refs.left, this.handleResize('left'), this);
                });
            }
            if (rowColumnRight.length) {
                this.$nextTick(() => {
                    this.handleResize('right')();
                    EleResize.on(this.$refs.right, this.handleResize('right'), this);
                });
            }
            return {
                allcloumns: res,
                rowColumn,
                rowColumnLeft,
                rowColumnRight
            };
        },
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
        leftTableWidth() {
            let widthPercent = 0;
            let widthPx = 0;
            this.rowColumn.rowColumnLeft.forEach(column => {
                if (column.width) {
                    if (column.width.indexOf('%') > -1) {
                        widthPercent += Number(column.width.replace('%', ''));
                    } else {
                        widthPx += Number(column.width.replace('px', ''));
                    }
                } else {
                    // 固定列默认200
                    widthPx += 200;
                }
            });
            return `calc(${widthPercent}% + ${widthPx}px)`;
        },
        rightTableWidth() {
            let widthPercent = 0;
            let widthPx = 0;
            this.rowColumn.rowColumnRight.forEach(column => {
                if (column.width) {
                    if (column.width.indexOf('%') > -1) {
                        widthPercent += Number(column.width.replace('%', ''));
                    } else {
                        widthPx += Number(column.width.replace('px', ''));
                    }
                } else {
                    // 固定列默认200
                    widthPx += 200;
                }
            });
            return `calc(${widthPercent}% + ${widthPx}px)`;
        }
    },
    watch: {
        countOptions(nval) {
            this.count = nval[0] || 15;
        }
    },
    methods: {
        initLoad() {
            return this.options
                ? (index, count) => {
                    return new Promise((resolve, reject) => {
                        resolve();
                    }).then(() => {
                        return {
                            options: count > -1
                                ? this.options.slice((index - 1) * count, index * count)
                                : this.options,
                            total: this.options.length
                        };
                    });
                } : this.lazyLoad;
        },
        hanlePagination(val) {
            this.index = val.index;
            this.count = val.count;
        },
        updateTotal(val) {
            this.total = val;
        },
        updateTableList(val) {
            this.$set(this, 'tableList', val);
        },
        setStandardTable() {
            let left = this.leftTable;
            let center = this.centerTable;
            let right = this.rightTable;
            let compateTable = function (col1, col2, col3, part) {
                let left = col1[part];
                let center = col2[part];
                let right = col3[part];
                let rows = [];
                let getRowspan = function(arr, index) {
                    if (!arr[index]) {
                        return 0;
                    } else {
                        let rowspan = 1;
                        let i = index + 1;
                        while (arr[i] === 0) {
                            rowspan++;
                            i++;
                        }
                        return rowspan;
                    }
                };
                center.forEach((row, index) => {
                    let r = [];
                    left[index] && r.push({
                        height: left[index],
                        rowspan: getRowspan(left, index)
                    });
                    center[index] && r.push({
                        height: center[index],
                        rowspan: getRowspan(center, index)
                    });
                    right[index] && r.push({
                        height: right[index],
                        rowspan: getRowspan(right, index)
                    });
                    rows.push(r);
                });
                return rows;
            };
            this.$set(this.standardTable, 'header', compateTable(left, center, right, 'header'));
            this.$set(this.standardTable, 'body', compateTable(left, center, right, 'body'));
        },
        rowHeightChange(val) {
            this.$set(this, 'rowHeight', val);
        },
        handleResize(DomKey) {
            return () => {
                this.$nextTick(() => {
                    let headerRow = this.$refs[DomKey + 'Header'].$refs.tr || [];
                    let bodyRow = this.$refs[DomKey + 'Body'].$refs.tr || [];
                    let headerRowHeight = [];
                    headerRow.forEach(row => {
                        let heights = [];
                        for (let i = 0; i < row.$el.children.length; i++) {
                            let cell = row.$el.children[i].children[0];
                            cell && heights.push(cell.offsetHeight);
                        }
                        let height = heights.length ? (Math.max(...heights) + 2) : 0;
                        headerRowHeight.push(height);
                    });
                    let BodyRowHeight = [];
                    bodyRow.forEach(row => {
                        let heights = [];
                        for (let i = 0; i < row.$el.children.length; i++) {
                            let cell = row.$el.children[i].children[0];
                            cell && heights.push(cell.offsetHeight);
                        }
                        let height = heights.length ? (Math.max(...heights) + 3) : 0;
                        BodyRowHeight.push(height);
                    });
                    this.$set(this[DomKey + 'Table'], 'headerMax', headerRowHeight.length - 1);
                    this.$set(this[DomKey + 'Table'], 'header', headerRowHeight);
                    this.$set(this[DomKey + 'Table'], 'body', BodyRowHeight);
                    this.setStandardTable();
                });
            };
        }
    }
};
</script>

<style lang="less">
    .y-table {
        .y-table-content {
            display: flex;
            overflow: hidden;
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
                .y-table-standard-cell {
                    width: 0;
                    padding: 0;
                }
            }
            .y-table-center {
                flex: 1;
                overflow: auto;
                table {
                    min-width: 100%;
                }
            }
            .y-table-left {
                box-shadow: 1px -2px 8px #a4ede0;
            }
            .y-table-right {
                box-shadow: -1px -2px 8px #a4ede0;
            }
        }
        .y-pagination {
            margin-top: 10px;
        }
    }
</style>
