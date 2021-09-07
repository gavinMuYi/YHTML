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
        highlight: {
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
        }
    },
    data() {
        return {
            column: [],
            name: 'VTableColumn'
        };
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
                    label: this.label,
                    columnKey: this.columnKey,
                    width: this.width,
                    children: this.column,
                    fixed: this.fixed
                };
                let that = this;
                column.headRender = function (h, label) {
                    if (that.$slots.header) {
                        return that.$slots.header;
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
