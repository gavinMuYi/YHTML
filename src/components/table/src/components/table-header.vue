<template>
    <div class="y-table-header">
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

<style>
.y-table-header {
    width: 100%;
    display: flex;
}
</style>