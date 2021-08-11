<template>
    <div class="y-icon_example">
        <YCheckbox status label="111" />
        <YCheckbox status="all" label="萨芬" />
        <YCheckbox status="half" label="阿斯ss顿发" />
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
