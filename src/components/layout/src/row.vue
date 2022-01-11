<template>
    <div class="y-row">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'YRow',
    props: {
        gutter: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
        };
    },
    methods: {
    }
};
</script>

<style lang="less">
    .y-row {
        display: flex;
    }
</style>
