<template>
    <div class="y-table" ref="table">
        <h2 v-if="title" class="y-table-title">{{ title }}</h2>
        <div :class="['y-table-content', ...gapLineClass]" ref="tableContent">
            <div class="y-table-hidden">
                <slot>
                    <y-table-column
                        v-for="(column, index) in columnConfig" :key="column.key + index"
                        :highlight="highlight" :columnKey="column.key"
                        :width="column.width" :label="column.label"
                        :fixed="column.fixed" />
                </slot>
                <y-tree v-if="multiple && basicIndex" :options="tableList" :multiple="true" ref="treeManger"
                        :value="currentSelect" @change="handleMultiple" :maps="treeMangerMap" :key="treeRefresh" />
                <y-table-data ref="dataTable" :lazyLoad="fetchFunc" :index="index" :count="count"
                              @updateTotal="updateTotal" @updateTableList="updateTableList"
                              :currentSort="currentSort" :async="!Boolean(options)" :defaultSort="defaultSort" />
                <y-table-standard :standardTable="standardTable" @rowHeightChange="rowHeightChange" />
            </div>
            <div class="y-table-box-headerFixed" v-if="headerFix" key="headerFixBox"
                 ref="headerFixedBox">
                <div class="y-table-actions" :style="{ width: 20 * maxExtendLevel + 60 + 'px' }"
                     v-if="Boolean(multiple && basicIndex)">
                    <table class="header-fix" v-if="headerFix" ref="actionFixHeader" style="width: 100%">
                        <y-table-header :columns="[]" :level="headerDeep" :actionTable="true"
                                        :rowHeight="rowHeight.header" :selfRowHeight="[]" />
                    </table>
                </div>
                <div class="y-table-left"
                     v-if="rowColumn.rowColumnLeft.length" :style="{
                         minWidth: `${leftTableWidth}`,
                         width: `${leftTableWidth}`
                }">
                    <table class="header-fix" ref="leftFixHeader" style="width: 100%">
                        <y-table-colgroup :colgroup="rowColumn.rowColumnLeft" />
                        <y-table-header :columns="headerColumn.headerColumnLeft" :level="headerDeep"
                                        ref="leftFixedHeader" @columnSort="columnSort($event, 'left')"
                                        @newExtendStatus="newExtendStatus($event, 'left')"
                                        :currentSort="currentSort" name="left" :defaultSort="defaultSort"
                                        :rowHeight="rowHeight.header" :selfRowHeight="leftTable.header" />
                    </table>
                </div>
                <div class="y-table-center">
                    <table class="header-fix" ref="centerFixHeader"
                           :style="{position: 'absolute',left: -scrollLeft + 'px'}">
                        <y-table-colgroup :colgroup="rowColumn.rowColumn" />
                        <y-table-header :columns="headerColumn.headerColumn" :level="headerDeep"
                                        ref="centerFixedHeader" @columnSort="columnSort($event, 'center')"
                                        @newExtendStatus="newExtendStatus($event, 'center')"
                                        :currentSort="currentSort" name="center" :defaultSort="defaultSort"
                                        :rowHeight="rowHeight.header" :selfRowHeight="centerTable.header" />
                    </table>
                </div>
                <div class="y-table-right"
                     v-if="rowColumn.rowColumnRight.length" :style="{
                         minWidth: `${rightTableWidth}`,
                         width: `${rightTableWidth}`
                }">
                    <table class="header-fix" ref="rightFixHeader" style="width: 100%">
                        <y-table-colgroup :colgroup="rowColumn.rowColumnRight" />
                        <y-table-header :columns="headerColumn.headerColumnRight" :level="headerDeep"
                                        ref="rightFixedHeader" @columnSort="columnSort($event, 'right')"
                                        @newExtendStatus="newExtendStatus($event, 'right')"
                                        :currentSort="currentSort" name="right" :defaultSort="defaultSort"
                                        :rowHeight="rowHeight.header" :selfRowHeight="rightTable.header" />
                    </table>
                </div>
            </div>
            <div :style="{ height: fixedBodyTop + 'px'}"></div>
            <div class="y-table-scrolling">
                <div class="y-table-main" ref="tableMainBox"
                     :style="{ maxHeight: tableHeight, width: scorlling ? 'calc(100% + 5px)' : '100%' }">
                    <div class="y-table-actions" :style="{ width: 20 * maxExtendLevel + 60 + 'px' }"
                         v-if="Boolean(multiple && basicIndex)">
                        <table>
                            <y-table-header v-if="!headerFix" :columns="[]" :level="headerDeep" :actionTable="true"
                                            :rowHeight="rowHeight.header" :selfRowHeight="[]" />
                            <y-table-body :columns="[]" :rowHeight="rowHeight.body" :actionTable="true"
                                          :selfRowHeight="[]" :tableList="tableList" :rows="rows" :maps="maps"
                                          @hover="handleHover" @hoverout="handleHoverout"
                                          :multiple="Boolean(multiple && basicIndex)"
                                          :currentHoverRow="currentHoverRow" @rowClick="handleClick"
                                          @select="handleSelect" :checkBoxStatus="checkBoxStatus"
                                          :basicIndex="basicIndex" />
                        </table>
                    </div>
                    <div class="y-table-box" ref="tableMain"
                         :style="{
                             width: `calc(100% - ${Boolean(multiple && basicIndex)
                             ? 20 * maxExtendLevel + 60 + 'px' : 0}`
                    }">
                        <div class="y-table-left"
                             v-if="rowColumn.rowColumnLeft.length" :style="{
                                 minWidth: `${leftTableWidth}`,
                                 width: `${leftTableWidth}`
                        }">
                            <table ref="left" style="width: 100%;">
                                <y-table-colgroup :colgroup="rowColumn.rowColumnLeft" ref="leftColgroup" />
                                <y-table-header v-if="!headerFix" :columns="headerColumn.headerColumnLeft"
                                                ref="leftHeader" :level="headerDeep" name="left"
                                                :defaultSort="defaultSort"
                                                @columnSort="columnSort($event, 'left')" :currentSort="currentSort"
                                                @newExtendStatus="newExtendStatus($event, 'left')"
                                                :rowHeight="rowHeight.header" :selfRowHeight="leftTable.header" />
                                <y-table-body :columns="rowColumn.rowColumnLeft" ref="leftBody"
                                              :rowHeight="rowHeight.body"
                                              :selfRowHeight="leftTable.body" :tableList="tableList" name="left"
                                              :currentHoverRow="currentHoverRow" @rowClick="handleClick"
                                              :multiple="Boolean(multiple && basicIndex)"
                                              :rows="rows" :maps="maps" @hover="handleHover"
                                              @hoverout="handleHoverout" />
                            </table>
                        </div>
                        <div class="y-table-center" ref="centerTableContent" key="center">
                            <table ref="center">
                                <y-table-colgroup :colgroup="rowColumn.rowColumn" ref="centerColgroup" />
                                <y-table-header v-if="!headerFix" :columns="headerColumn.headerColumn"
                                                ref="centerHeader"
                                                :level="headerDeep" @columnSort="columnSort($event, 'center')"
                                                @newExtendStatus="newExtendStatus($event, 'center')"
                                                :currentSort="currentSort" name="center" :defaultSort="defaultSort"
                                                :rowHeight="rowHeight.header" :selfRowHeight="centerTable.header" />
                                <y-table-body :columns="rowColumn.rowColumn" ref="centerBody"
                                              :rowHeight="rowHeight.body"
                                              :selfRowHeight="centerTable.body" :tableList="tableList" name="center"
                                              :currentHoverRow="currentHoverRow" @rowClick="handleClick"
                                              :multiple="Boolean(multiple && basicIndex)"
                                              :rows="rows" :maps="maps" @hover="handleHover" @hoverout="handleHoverout"
                                              :widthLeft="Boolean(rowColumn.rowColumnLeft.length)" />
                            </table>
                        </div>
                        <div class="y-table-right"
                             v-if="rowColumn.rowColumnRight.length" :style="{
                                 minWidth: `${rightTableWidth}`,
                                 width: `${rightTableWidth}`
                        }">
                            <table ref="right" style="width: 100%">
                                <y-table-colgroup :colgroup="rowColumn.rowColumnRight" ref="rightColgroup" />
                                <y-table-header v-if="!headerFix" :columns="headerColumn.headerColumnRight"
                                                ref="rightHeader" :level="headerDeep" name="right"
                                                :defaultSort="defaultSort"
                                                @columnSort="columnSort($event, 'right')" :currentSort="currentSort"
                                                @newExtendStatus="newExtendStatus($event, 'right')"
                                                :rowHeight="rowHeight.header" :selfRowHeight="rightTable.header" />
                                <y-table-body :columns="rowColumn.rowColumnRight" ref="rightBody"
                                              :rowHeight="rowHeight.body" :multiple="Boolean(multiple && basicIndex)"
                                              :selfRowHeight="rightTable.body" :tableList="tableList" name="right"
                                              :currentHoverRow="currentHoverRow" @rowClick="handleClick"
                                              :rows="rows" :maps="maps" @hover="handleHover"
                                              @hoverout="handleHoverout" />
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <y-pagination
            v-if="!scrollTable"
            :total="total" :index="index" :countOptions="countOptions"
            @change="hanlePagination"/>
    </div>
</template>

<script>
import clone from 'clone';
import { EleResize } from '@/utils/dom.js';
import YTree from '@/components/tree';
import YPagination from '@/components/pagination';
import YTableColumn from './components/table-column';
import YTableBody from './components/table-body';
import YTableHeader from './components/table-header';
import YTableData from './components/table-data';
import YTableColgroup from './components/table-colgroup';
import YTableStandard  from './components/table-standard';

export default {
    name: 'YTable',
    components: {
        YTree,
        YPagination,
        YTableColumn,
        YTableColgroup,
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
            default: (leaf, index, count) => {
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
        title: {
            type: String,
            default: ''
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
        },
        headerFix: {
            type: Boolean,
            default: false
        },
        tableHeight: {
            type: String
        },
        defaultSort: {
            type: Object,
            default: () => {
                return {};
            }
        },
        colspanColumns: {
            type: Array,
            default: () => {
                return [];
            }
        },
        basicIndex: {
            type: String,
            default: ''
        },
        selected: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    data() {
        return {
            treeRefresh: 0,
            checkBoxStatus: {},
            currentSelect: clone(this.selected),
            tableMainBoxHeight: 0,
            tableMainHeight: 0,
            fixedBodyTop: 0,
            leftFixHeaderHeight: 0,
            centerFixHeaderHeight: 0,
            rightFixHeaderHeight: 0,
            leftHeight: 0,
            centerHeight: 0,
            rightHeight: 0,
            name: 'VTable',
            fetchFunc: this.initLoad(),
            index: 1,
            count: this.countOptions[0] || 15,
            total: 0,
            tableList: [],
            column: [],
            maps: {},
            currentSort: {
                order: null,
                key: null,
                compare: null,
                columnIndex: null,
                name: null
            },
            maxExtendLevel: 1,
            currentHoverRow: null,
            scrollLeft: 0,
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
            },
            centerGap: 0
        };
    },
    computed: {
        _column() {
            let filterCloumn = this.column;
            let recursion = (arr) => {
                arr.forEach(item => {
                    if (item.extend && item.children_bak && item.children_bak.length) {
                        item.children = item.children_bak;
                    }
                    if (item.children && item.children.length) {
                        item.withChildren = true;
                        if (item.extend) {
                            recursion(item.children);
                        } else {
                            item.children_bak = clone(item.children);
                            item.children = [];
                        }
                    }
                });
            };
            recursion(filterCloumn);
            return filterCloumn;
        },
        gapLineClass() {
            let className = [];
            if (!this.scrollLeft) {
                className.push('no-left-gap');
            }
            if (this.scrollLeft === this.centerGap || !this.centerGap) {
                className.push('no-right-gap');
            }
            return className;
        },
        treeMangerMap() {
            return {
                key: this.basicIndex,
                label: 'label',
                children: 'children',
                hasChildren: 'hasChildren',
                disable: 'disable',
                extend: 'extend',
                cascade: 'cascade'
            };
        },
        scorlling() {
            if (!this.headerFix) {
                return false;
            }
            return this.tableMainBoxHeight < this.tableMainHeight;
        },
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
            recursion(this._column, 0);
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
            getColumn(this._column);
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
                this.handleResize()();
                if (this.headerFix) {
                    this.handleFixedResize()();
                    this.getTableMainBoxHeight();
                    EleResize.on(this.$refs.centerFixHeader, this.handleFixedResize(), this);
                    EleResize.on(this.$refs.tableMainBox, this.getTableMainBoxHeight, this);
                }
                EleResize.on(this.$refs.center, this.handleResize(), this);
            });
            if (rowColumnLeft.length) {
                this.$nextTick(() => {
                    if (this.headerFix) {
                        EleResize.on(this.$refs.leftFixHeader, this.handleFixedResize(), this);
                    }
                    EleResize.on(this.$refs.left, this.handleResize(), this);
                });
            }
            if (rowColumnRight.length) {
                this.$nextTick(() => {
                    if (this.headerFix) {
                        EleResize.on(this.$refs.rightFixHeader, this.handleFixedResize(), this);
                    }
                    EleResize.on(this.$refs.right, this.handleResize(), this);
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
            recursion(this._column, 1);
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
            return `calc(${widthPercent}% + ${widthPx + 5}px)`;
        },
        rows() {
            this.maps = {};
            let rows = [];
            let index = -1;
            this.maxExtendLevel = 0;
            let flat = (arr, level, pre) => {
                arr.forEach((row, rindex) => {
                    this.maps[pre + '-' + rindex] = ++index;
                    rows.push({
                        ...row,
                        $y_table_level: level
                    });
                    if (row.extend) {
                        this.maxExtendLevel = Math.max(level, this.maxExtendLevel);
                    }
                    if (row.children && row.children.length && row.extend) {
                        flat(row.children, level + 1, pre + '-' + rindex);
                    }
                });
            };
            flat(this.tableList, 1, '0');
            return rows;
        }
    },
    watch: {
        selected(nval) {
            this.$set(this, 'currentSelect', clone(nval));
        },
        rowHeight(nval) {
            if ((nval.header.length && !this.leftTable.header.length)
                || (nval.body.length && !this.leftTable.body.length)
                || (nval.header.length && !this.rightTable.header.length)
                || (nval.body.length && !this.rightTable.body.length)) {
                this.$nextTick(() => {
                    this.handleResize()();
                    if (this.headerFix) {
                        this.handleFixedResize()();
                    }
                });
            }
        },
        countOptions(nval) {
            this.count = nval[0] || 15;
        },
        tableList(nval) {
            this.treeRefresh++;
            setTimeout(() => {
                // 重置行高
                this.handleResize()(true);
                if (this.headerFix) {
                    this.handleFixedResize()();
                }
                if (this.multiple && this.basicIndex) {
                    this.getCheckBoxStatus();
                }
            });
        }
    },
    mounted() {
        this.scorllXHandler();
    },
    methods: {
        initLoad() {
            return this.options
                ? (leaf, index, count, sortFunc) => {
                    let ops = sortFunc ? sortFunc(this.options) : this.options;
                    return new Promise((resolve, reject) => {
                        resolve();
                    }).then(() => {
                        return {
                            options: count > -1
                                ? ops.slice((index - 1) * count, index * count)
                                : ops,
                            total: ops.length
                        };
                    });
                } : this.lazyLoad;
        },
        hanlePagination(val) {
            this.index = val.index;
            this.count = val.count;
        },
        columnSort({ order, key, compare, columnIndex }, name) {
            this.$set(this, 'currentSort', {
                order, key, compare, columnIndex, name
            });
        },
        newExtendStatus({ key, newStatus, gindex, deep }, name) {
            let recursion = (arr, d, fixed) => {
                arr.forEach(item => {
                    if (deep === d) {
                        if ((fixed || item.fixed || 'center') === name) {
                            gindex--;
                        }
                        if (gindex === -1) {
                            this.$set(item, 'extend', newStatus);
                        }
                    } else if (deep > d) {
                        recursion(item.children, d + 1, fixed || item.fixed || 'center');
                    }
                });
            };
            recursion(this.column, 1);
        },
        handleClick(rowData) {
            this.$emit('rowClick', rowData);
            if (rowData.hasChildren || (rowData.children && rowData.children.length)) {
                this.$refs.dataTable.extendChange(rowData.$y_table_position);
            }
        },
        handleMultiple(val) {
            this.$set(this, 'currentSelect', val);
            this.$emit('multipleSelect', val);
            this.getCheckBoxStatus();
        },
        getCheckBoxStatus() {
            let checkBoxStatus = {};
            let flat = (arr, target) => {
                arr.forEach(node => {
                    let item = {
                        tracked: node.tracked
                    };
                    this.$set(target, node.self[this.basicIndex], item);
                    if (node.$refs.leaf) {
                        item.children = {};
                        flat(node.$refs.leaf, item.children);
                    }
                });
            };
            this.$nextTick(() => {
                flat(this.$refs.treeManger.$refs.leaf, checkBoxStatus);
                this.$set(this, 'checkBoxStatus', checkBoxStatus);
            });
        },
        handleSelect(rowData) {
            let mangerLeaf = this.$refs.treeManger;
            rowData.$y_table_position.forEach(index => {
                mangerLeaf = mangerLeaf.$refs.leaf[index];
            });
            mangerLeaf && mangerLeaf.multipleSelect();
        },
        updateTotal(val) {
            this.total = val;
        },
        updateTableList(val) {
            this.$set(this, 'tableList', val);
        },
        handleHover(index) {
            this.currentHoverRow = index;
        },
        handleHoverout(index) {
            this.currentHoverRow = null;
        },
        scorllXHandler() {
            let content = this.$refs.centerTableContent;
            let centerTable = this.$refs.center;
            content && content.addEventListener('scroll', () => {
                this.scrollLeft = content.scrollLeft;
                this.centerGap = centerTable.offsetWidth - content.offsetWidth;
            });
            this.tableGapHandler();
        },
        tableGapHandler() {
            let content = this.$refs.centerTableContent;
            let centerTable = this.$refs.center;
            let handler = () => {
                this.centerGap = centerTable.offsetWidth - content.offsetWidth;
            };
            EleResize.on(this.$refs.table, handler, this);
        },
        setWidth(currentcol, val) {
            let setColumn = (arr) => {
                arr.forEach(column => {
                    let children = column.children;
                    if (children && children.length) {
                        setColumn(children);
                    }
                    if (column.uuid === currentcol.uuid) {
                        this.$set(column, 'width', val);
                    }
                });
            };
            setColumn(this._column);
        },
        resetTableHeader() {
            this.$set(this.leftTable, 'header', []);
            this.$set(this.centerTable, 'header', []);
            this.$set(this.rightTable, 'header', []);
            this.$set(this.standardTable, 'header', []);
            this.$set(this.rowHeight, 'header', []);
            this.$set(this.leftTable, 'headerMax', 0);
            this.$set(this.centerTable, 'headerMax', 0);
            this.$set(this.rightTable, 'headerMax', 0);
        },
        resetTableStyle() {
            let empty = {
                headerMax: 0,
                header: [],
                body: []
            };
            if (this.headerFix) {
                empty = {
                    body: []
                };
            }
            this.$set(this, 'leftTable', {
                ...this.leftTable,
                ...empty
            });
            this.$set(this, 'centerTable', {
                ...this.centerTable,
                ...empty
            });
            this.$set(this, 'rightTable', {
                ...this.rightTable,
                ...empty
            });
            if (this.headerFix) {
                this.$set(this, 'standardTable', {
                    ...this.standardTable,
                    body: []
                });
                this.$set(this, 'rowHeight', {
                    ...this.rowHeight,
                    body: []
                });
            } else {
                this.$set(this, 'standardTable', {
                    header: [],
                    body: []
                });
                this.$set(this, 'rowHeight', {
                    header: [],
                    body: []
                });
            }
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
        getTableMainBoxHeight() {
            setTimeout(() => {
                this.tableMainBoxHeight = this.$refs.tableMainBox.offsetHeight;
            });
        },
        handleFixedResize() {
            let getHeight = (DomKey) => {
                DomKey = DomKey + 'FixHeader';
                let newHeight = this.$refs[DomKey] ? this.$refs[DomKey].offsetHeight : 0;
                let oldHeight = this[DomKey + 'Height'];
                this[DomKey + 'Height'] = newHeight;
                return newHeight === oldHeight;
            };
            let resizeFn = (DomKey) => {
                let headerRow = this.$refs[DomKey + 'FixedHeader']
                    ? (this.$refs[DomKey + 'FixedHeader'].$refs.tr || [])
                    : [];
                let headerRowHeight = [];
                headerRow.forEach(row => {
                    let height = row.$el.offsetHeight;
                    headerRowHeight.push(height);
                });
                if (headerRowHeight.toString() !== this.rowHeight.header.toString()) {
                    this.$set(this[DomKey + 'Table'], 'header', headerRowHeight);
                }
                this.$set(this[DomKey + 'Table'], 'headerMax', headerRowHeight.length - 1);
            };
            return () => {
                let reset = false;
                ['left', 'center', 'right'].forEach(DomKey => {
                    let answer = !getHeight(DomKey);
                    reset = reset || answer;
                });
                if (reset) {
                    this.resetTableHeader();
                    this.$nextTick(() => {
                        ['left', 'center', 'right'].forEach(DomKey => {
                            resizeFn(DomKey);
                        });
                        this.setStandardTable();
                        setTimeout(() => {
                            this.fixedBodyTop = this.$refs.headerFixedBox.offsetHeight;
                        });
                    });
                }
            };
        },
        handleResize() {
            let getHeight = (DomKey) => {
                let newHeight = this.$refs[DomKey] ? this.$refs[DomKey].offsetHeight : 0;
                let oldHeight = this[DomKey + 'Height'];
                this[DomKey + 'Height'] = newHeight;
                return newHeight === oldHeight;
            };
            let resizeFn = (DomKey) => {
                if (!this.headerFix) {
                    let headerRow = this.$refs[DomKey + 'Header']
                        ? (this.$refs[DomKey + 'Header'].$refs.tr || [])
                        : [];
                    let headerRowHeight = [];
                    headerRow.forEach(row => {
                        let height = row.$el.offsetHeight;
                        headerRowHeight.push(height);
                    });
                    if (headerRowHeight.toString() !== this.rowHeight.header.toString()) {
                        this.$set(this[DomKey + 'Table'], 'header', headerRowHeight);
                    }
                    this.$set(this[DomKey + 'Table'], 'headerMax', headerRowHeight.length - 1);
                }
                let bodyRow = this.$refs[DomKey + 'Body'].$refs.tr
                    ? this.$refs[DomKey + 'Body'].$refs.tr || []
                    : [];
                let BodyRowHeight = [];
                bodyRow.forEach(row => {
                    let height = row.elm.offsetHeight;
                    BodyRowHeight.push(height);
                });
                if (BodyRowHeight.toString() !== this.rowHeight.body.toString()) {
                    this.$set(this[DomKey + 'Table'], 'body', BodyRowHeight);
                }
            };
            let getGap = () => {
                let content = this.$refs.centerTableContent;
                let centerTable = this.$refs.center;
                this.centerGap = centerTable.offsetWidth - content.offsetWidth;
            };
            return (reSizing) => {
                let reset = false;
                ['left', 'center', 'right'].forEach(DomKey => {
                    reset = reset || !getHeight(DomKey);
                });
                getGap();
                if (reset || reSizing) {
                    this.resetTableStyle();
                    this.$nextTick(() => {
                        ['left', 'center', 'right'].forEach(DomKey => {
                            resizeFn(DomKey);
                        });
                        this.setStandardTable();
                        this.tableMainHeight = this.$refs.tableMain.offsetHeight;
                    });
                }
            };
        }
    }
};
</script>

<style lang="less">
    .y-table {
        .y-table-title {
            margin-top: 0px;
        }
        .y-table-content {
            position: relative;
            .y-table-scrolling {
                overflow-y: auto;
                overflow-x: hidden;
                position: relative;
                .y-table-main {
                    position: relative;
                }
            }
            .y-table-box {
                display: flex;
                overflow: hidden;
            }
            .y-table-box-headerFixed {
                display: flex;
                overflow: hidden;
                width: 100%;
                z-index: 1000;
                position: absolute;
                .y-table-center {
                    overflow-x: hidden;
                }
            }
            .y-table-hidden {
                width: 0px;
                height: 0px;
                overflow: hidden;
                opacity: 0;
                position: absolute;
                top: 0;
                left: 0;
            }
            .y-table-actions {
                display: inline-block;
                left: 1px;
                float: left;
                .y-table-action-cell {
                    position: relative;
                    .y-table-row_icon-box {
                        position: relative;
                        .y-table-row_icon {
                            fill: #496866;
                            height: 19px;
                            position: absolute;
                            left: -55px;
                        }
                    }
                }
            }
            table {
                border-spacing: 0px;
                table-layout: fixed;
                word-break:break-all;
                .y-table-cell {
                    font-size: 14px;
                    font-weight: 400;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    padding: 5px;
                    box-sizing: border-box;
                    .y-table-row_icon {
                        margin-right: 5px;
                        fill: #496866;
                    }
                    .y-table-cell_content {
                        flex: 1;
                    }
                }
                .y-table-standard-cell {
                    width: 0;
                    height: 1px;
                    padding: 0;
                }
            }
            .y-table-center {
                flex: 1;
                overflow-x: auto;
                table {
                    min-width: 100%;
                }
            }
            .y-table-left {
                z-index: 10;
                position: relative;
                box-shadow: 1px -2px 8px #a4ede0;
            }
            .y-table-right {
                z-index: 10;
                position: relative;
                box-shadow: -1px -2px 8px #a4ede0;
            }
            .y-table-center {
                position: relative;
            }
            .y-table-actions {
                table {
                    .y-table-action-cell {
                        .y-table_checkbox {
                            display: flex;
                            justify-content: center;
                            width: 58px;
                            height: 16px;
                        }
                    }
                }
            }
        }
        .no-left-gap {
            .y-table-left {
                box-shadow: none;
            }
        }
        .no-right-gap {
            .y-table-right {
                box-shadow: none;
            }
        }
        .y-pagination {
            margin-top: 10px;
        }
    }
</style>
