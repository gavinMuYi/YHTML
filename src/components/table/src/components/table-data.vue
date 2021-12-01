<template>
    <div class="y-table-data">
    </div>
</template>

<script>
import clone from 'clone';

export default {
    name: 'YTableData',
    props: {
        async: {
            type: Boolean,
            default: true
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
        index: {
            type: Number,
            default: 1
        },
        count: {
            type: Number,
            default: -1
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
        }
    },
    data() {
        return {
            total: 0,
            tableList: []
        };
    },
    watch: {
        total(nval) {
            this.$emit('updateTotal', nval);
        },
        tableList(nval) {
            this.$emit('updateTableList', nval);
        },
        index(nval) {
            this.updateData();
        },
        count(nval) {
            this.updateData();
        },
        currentSort(nval, oval) {
            if (nval.key && (JSON.stringify(nval) !== JSON.stringify(oval))) {
                this.lazyLoad(null, this.index, this.count, this.async ? nval : this.sortData).then(res => {
                    this.total = res.total || 0;
                    this.$set(this, 'tableList', clone(res.options));
                });
            }
        }
    },
    mounted() {
        if (!this.defaultSort.key) {
            this.updateData();
        }
    },
    methods: {
        sortData(arr) {
            if (this.currentSort.key) {
                let key = this.currentSort.key;
                let compare = this.currentSort.compare || function (a, b) {
                    return a[key] === b[key]
                        ? 0
                        : a[key] > b[key]
                            ? 1 : -1;
                };
                arr.sort(compare);
                if (this.currentSort.order === 'desc') {
                    arr.reverse();
                }
            }
            return arr;
        },
        updateData(leaf) {
            if (leaf) {
                this.$set(leaf, 'loading', true);
                this.lazyLoad(leaf).then(res => {
                    this.$set(leaf, 'children', clone(res || []));
                    delete leaf.loading;
                    delete leaf.hasChildren;
                    this.$set(leaf, 'extend', !leaf.extend);
                }).catch(e => {
                    delete leaf.loading;
                });
            } else {
                this.lazyLoad(null, this.index, this.count, this.async ? this.currentSort : this.sortData).then(res => {
                    this.total = res.total || 0;
                    this.$set(this, 'tableList', clone(res.options));
                });
            }
        },
        extendChange(position) {
            let item = null;
            position.forEach((index, i) => {
                item && (item = item.children[index]);
                !item && (item = this.tableList[index]);
            });
            if (item.hasChildren) {
                this.updateData(item);
            } else {
                item && this.$set(item, 'extend', !item.extend);
            }
            this.$emit('updateTableList', this.tableList);
        }
    }
};
</script>
