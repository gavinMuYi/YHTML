<template>
    <div class="y-table-header y-th">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'YTableHeader',
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
            YComponentName: 'YTableHeader'
        };
    }
};
</script>

<style lang="less">
.y-table-header {
    width: 100%;
    display: flex;
    .header-y-td-border:first-child {
        &:before {
            display: none;
        }
    }
    .y-cell {
        height: 50px;
        align-items: center;
        display: flex;
    }
}
</style>