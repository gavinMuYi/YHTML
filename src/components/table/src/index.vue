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
        </div>
        <div class="y-table-left"
             v-if="rowColumn.rowColumnLeft.length" :style="`width: ${leftTableWidth}`">
            <table ref="left" style="width: 100%;">
                <y-table-header :columns="headerColumn.headerColumnLeft" ref="leftHeader" :level="headerDeep"
                                :rowHeight="rowHeight.header" :selfRowHeight="leftTable.header" />
                <y-table-body :columns="rowColumn.rowColumnLeft" ref="leftBody" :rowHeight="rowHeight.body"
                              :selfRowHeight="leftTable.body" />
            </table>
        </div>
        <div class="y-table-center">
            <table ref="center">
                <y-table-header :columns="headerColumn.headerColumn" ref="centerHeader" :level="headerDeep"
                                :rowHeight="rowHeight.header" :selfRowHeight="centerTable.header" />
                <y-table-body :columns="rowColumn.rowColumn" ref="centerBody" :rowHeight="rowHeight.body"
                              :selfRowHeight="centerTable.body" />
            </table>
        </div>
        <div class="y-table-right"
             v-if="rowColumn.rowColumnRight.length" :style="`width: ${rightTableWidth}`">
            <table ref="right" style="width: 100%;">
                <y-table-header :columns="headerColumn.headerColumnRight" ref="rightHeader" :level="headerDeep"
                                :rowHeight="rowHeight.header" :selfRowHeight="rightTable.header" />
                <y-table-body :columns="rowColumn.rowColumnRight" ref="rightBody" :rowHeight="rowHeight.body"
                              :selfRowHeight="rightTable.body" />
            </table>
        </div>
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
        },
        rowHeight() {
            let headerHeight = [];
            let left = this.leftTable.header;
            let center = this.centerTable.header;
            let right = this.rightTable.header;
            let indexs3 = [this.leftTable.headerMax, this.centerTable.headerMax, this.rightTable.headerMax].sort();
            let lastTwo = {
                a: [],
                b: []
            };
            let standard = 0;
            let bSum = 0;
            for (let i = 0; i < this.headerDeep; i++) {
                if (left[i] && center[i] && right[i]) {
                    headerHeight.push(Math.max(left[i], center[i], right[i]));
                } else {
                    if (indexs3[0] === indexs3[1]) {
                        headerHeight.push(Math.max(left[i], center[i], right[i]));
                    } else {
                        if (i < indexs3[1]) {
                            headerHeight.push(Math.max(left[i], center[i], right[i]));
                        }
                        else if (i === indexs3[1]) {
                            if (!left[i]) {
                                lastTwo.a = !center[i + 1] ? center : right;
                                lastTwo.b = !center[i + 1] ? right : center;
                            }
                            if (!center[i]) {
                                lastTwo.a = !left[i + 1] ? left : right;
                                lastTwo.b = !left[i + 1] ? right : left;
                            }
                            if (!right[i]) {
                                lastTwo.a = !center[i + 1] ? center : left;
                                lastTwo.b = !center[i + 1] ? left : center;
                            }
                            standard = lastTwo.a[i];
                            bSum += lastTwo.b[i];
                            headerHeight.push(lastTwo.b[i]);
                        }
                        else if (i > indexs3[1] && i < this.headerDeep - 1) {
                            bSum += lastTwo.b[i];
                            headerHeight.push(lastTwo.b[i]);
                        }
                        else {
                            headerHeight.push(Math.max(standard - bSum, lastTwo.b[i]));
                        }
                    }
                }
            }
            return {
                header: headerHeight,
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
                let headerRowHeight = [];
                let headerRowHeightNull = [];
                headerRow.forEach(row => {
                    let heights = [];
                    for (let i = 0; i < row.$el.children.length; i++) {
                        let cell = row.$el.children[i].children[0];
                        cell && heights.push(cell.offsetHeight);
                    }
                    let height = heights.length ? (Math.max(...heights) + 2) : 0;
                    height ? headerRowHeight.push(height) : headerRowHeightNull.push(height);
                });
                let BodyRowHeight = [];
                let BodyRowHeightNull = [];
                bodyRow.forEach(row => {
                    let heights = [];
                    for (let i = 0; i < row.$el.children.length; i++) {
                        let cell = row.$el.children[i].children[0];
                        cell && heights.push(cell.offsetHeight);
                    }
                    let height = heights.length ? (Math.max(...heights) + 3) : 0;
                    height ? BodyRowHeight.push(height) : BodyRowHeightNull.push(height);
                });
                this.$nextTick(() => {
                    this.$set(this[DomKey + 'Table'], 'headerMax', headerRowHeight.length - 1);
                    this.$set(this[DomKey + 'Table'], 'header', headerRowHeight.concat(headerRowHeightNull));
                    this.$set(this[DomKey + 'Table'], 'body', BodyRowHeight.concat(BodyRowHeightNull));
                });
            };
        }
    }
};
</script>

<style lang="less">
    .y-table {
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
</style>
