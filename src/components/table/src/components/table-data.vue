<template>
    <div class="y-table-data">
    </div>
</template>

<script>
import clone from 'clone';

export default {
    name: 'YTableData',
    props: {
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
        index: {
            type: Number,
            default: 1
        },
        count: {
            type: Number,
            default: -1
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
        }
    },
    mounted() {
        this.updateData();
    },
    methods: {
        updateData(leaf) {
            if (leaf) {
                this.$set(leaf, 'loading', true);
                this.lazyLoad(leaf).then(res => {
                    this.$set(leaf, 'children', clone(res || []));
                    delete leaf.loading;
                    delete leaf.hasChildren;
                }).catch(e => {
                    delete leaf.loading;
                });
            } else {
                this.lazyLoad(null, this.index, this.count).then(res => {
                    this.total = res.total || 0;
                    this.$set(this, 'tableList', clone(res.options || []));
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
            }
            this.$set(item, 'extend', !item.extend);
        }
    }
};
</script>
