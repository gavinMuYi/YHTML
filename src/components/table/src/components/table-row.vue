<template>
    <div class="y-table-row">
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

<style>
.y-table-row {
    width: 100%;
    display: flex;
}
</style>