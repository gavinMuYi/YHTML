<template>
    <div class="y-icon_example">
        <y-checkbox status label="111" />
        <y-checkbox status="all" label="萨芬" />
        <y-checkbox status="half" label="阿斯ss顿发" />
    </div>
</template>

<script>
import YCheckbox from './index';

export default {
    name: 'YCheckboxExample',
    components: {
        YCheckbox
    },
};
</script>

<style lang="less">
   .y-icon_example {}
</style>
