<template>
    <div class="y-table">
        <div class="y-table-cloumn-hidden">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'YTable',
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
            column: []
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
            return {
                hearderColumnLeft,
                hearderColumn,
                hearderColumnRight
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
            return {
                rowColumnLeft,
                rowColumn,
                rowColumnRight
            };
        }
    },
    mounted() {
        console.log(this.headerColumn);
        console.log(this.rowColumn);
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
    }
};
</script>

<style lang="less">
    .y-table {
        .y-table-cloumn-hidden {
            width: 0px;
            height: 0px;
            overflow: hidden;
        }
    }
</style>
