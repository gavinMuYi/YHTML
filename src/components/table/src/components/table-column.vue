<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: 'YTableColumn',
    components: {
    },
    props: {
        label: {
            type: String,
            default: ''
        },
        columnKey: {
            type: String,
            default: ''
        },
        width: {
            type: String,
            default: null
        },
        fixed: {
            type: String,
            default: ''
        },
        rowspan: {
            type: Boolean,
            default: false
        },
        dragable: {
            type: Boolean,
            default: false
        },
        sortable: {
            type: Boolean,
            default: false
        },
        extend: {
            type: Boolean,
            default: true
        },
        extendable: {
            type: Boolean,
            default: true
        },
        compare: {
            type: Function
        },
        align: {
            type: String,
            default: 'left'
        }
    },
    data() {
        return {
            uuid: Math.random(),
            column: [],
            name: 'VTableColumn'
        };
    },
    watch: {
        label() {
            this.setParentColumn();
        },
        columnKey() {
            this.setParentColumn();
        },
        width() {
            this.setParentColumn();
        },
        fixed() {
            this.setParentColumn();
        },
        rowspan() {
            this.setParentColumn();
        },
        dragable() {
            this.setParentColumn();
        },
        sortable() {
            this.setParentColumn();
        },
        extend() {
            this.setParentColumn();
        },
        compare() {
            this.setParentColumn();
        },
        align() {
            this.setParentColumn();
        },
        extendable() {
            this.setParentColumn();
        }
    },
    created() {
        this.setParentColumn();
    },
    methods: {
        getIndex() {
            let child = this;
            let parent = this.$parent;
            let columnIndex = 0;
            let columnIndexAdd = (parent, loopable) => {
                parent.$children.forEach((vnode, index) => {
                    if (loopable && vnode._uid === child._uid) {
                        loopable = false;
                    } else {
                        columnIndex += parent.$children[index].$children.length;
                    }
                });
                return loopable;
            };
            while (parent && !parent.name) {
                let loopable = true;
                loopable = columnIndexAdd(parent, loopable);
                child = parent;
                parent = parent.$parent;
            }
            parent.$children.forEach((vnode, index) => {
                if (vnode._uid === child._uid) {
                    columnIndex += index;
                }
            });
            return columnIndex;
        },
        setParentColumn() {
            if (this.$parent && (this.$parent.name === 'VTableColumn' || this.$parent.name === 'VTable')) {
                let column = {
                    uuid: this.uuid,
                    label: this.label,
                    columnKey: this.columnKey,
                    width: this.width,
                    children: this.column,
                    fixed: this.fixed,
                    rowspan: this.rowspan,
                    dragable: this.dragable,
                    sortable: this.sortable,
                    extend: this.extend,
                    compare: this.compare,
                    extendable: this.extendable,
                    align: this.align
                };
                let that = this;
                column.headRender = function (h, label, data) {
                    if (that.$scopedSlots.header) {
                        return that.$scopedSlots.header(data);
                    } else {
                        return label;
                    }
                };
                column.render = function (h, label, data) {
                    if (that.$scopedSlots.cell) {
                        return that.$scopedSlots.cell(data);
                    } else {
                        return label;
                    }
                };
                this.$parent.column && this.$set(this.$parent.column, this.getIndex(), column);
            }
        }
    }
};
</script>

<style lang="less">
</style>
