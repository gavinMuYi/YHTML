<template>
    <div class="y-icon_example">
        <YIcon name="arrow-up" @click.native="handleClick" />
        <YIcon name="arrow-down" @click.native="handleClick" />
    </div>
</template>

<script>
import YIcon from './index';
// const requireAll = requireContext => requireContext.keys().map(requireContext);
// const req = require.context('./src/assets/icons', true, /\.svg$/);
// requireAll(req);

export default {
    name: 'YIconExample',
    components: {
        YIcon
    },
    methods: {
        handleClick() {
            console.log('ss');
        }
    },
};
</script>

<style lang="less">
   .y-icon_example {}
</style>
