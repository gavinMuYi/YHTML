<template>
    <div :class="['y-table-row', 'y-tr', {'y-table-row-isFolder': context.isFolder}]">
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
        }
    },
    data() {
        return {
            YComponentName: 'YTableRow'
        };
    }
};
</script>

<style lang="less">
.y-table-row {
    width: 100%;
    display: flex;
}
.y-table-row-isFolder {
    &:hover {
        background: #e2fffd;
        cursor: pointer;
    }
}
</style>