<template>
    <div :class="['y-table-row', 'y-tr', {'y-table-row-isFolder': context.isFolder}]" @click="rowClick">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'YTableRow',
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
            YComponentName: 'YTableRow'
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
.y-table-row {
    width: 100%;
    display: flex;
}
.y-table-row-isFolder {
    &:hover {
        background: #cbf9f1;
        cursor: pointer;
    }
}
</style>
