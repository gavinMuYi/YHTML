<template>
    <svg aria-hidden="true" class="y-icon" @click="handleClick">
        <use :xlink:href="`#icon-${name}`" style="pointer-events:none" />
    </svg>
</template>

<script>
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./assets/icons', true, /\.svg$/);
requireAll(req);

export default {
    name: 'YIcon',
    props: {
        name: {
            type: String,
            default: ''
        }
    },
    methods: {
        handleClick(e) {
            this.$emit('click', e);
        }
    }
};
</script>

<style lang="less">
    .y-icon {
        width: 14px;
        height: 14px;
    }
</style>
