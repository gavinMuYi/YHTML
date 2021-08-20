<template>
    <tr :class="['y-tree-table-row', 'y-tr', {'y-tree-table-row-isFolder': context.isFolder}]" @click="rowClick">
        <slot></slot>
    </tr>
</template>

<script>
export default {
    name: 'YTreeTableRow',
    props: {
        context: {
            type: Object,
            default: () => {
                return {};
            }
        },
        multiple: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            YComponentName: 'YTreeTableRow'
        };
    },
    methods: {
        rowClick() {
            this.$emit('rowClick', this.context.data);
        }
    },
};
</script>

<style lang="less">
.y-tree-table-row {
    width: 100%;
    display: flex;
}
.y-tree-table-row-isFolder {
    &:hover {
        background: #cbf9f1;
        cursor: pointer;
    }
}
</style>
