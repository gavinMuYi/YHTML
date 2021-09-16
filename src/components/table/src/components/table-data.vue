<template>
    <div class="y-table-data">
    </div>
</template>

<script>
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
        this.updateData(1);
    },
    methods: {
        updateData(level) {
            this.lazyLoad(this.index, this.count).then(res => {
                this.total = res.total || 0;
                this.$set(this, 'tableList', (res.options || []).map(row => {
                    return {
                        ...row,
                        $y_table_level: level
                    };
                }));
            });
        },
        extendChange(position) {
            let item = null;
            position.forEach((index, i) => {
                item && (item = item.children[index]);
                !item && (item = this.tableList[index]);
            });
            this.$set(item, 'extend', !item.extend);
        }
    }
};
</script>
