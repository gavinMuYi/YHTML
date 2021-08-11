<template>
    <div class="y-icon_example">
        <YCheckbox status />
        <YCheckbox status="all" />
        <YCheckbox status="half" />
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
