<template>
    <div class="y-popmenu_example">
        <YPopmenu ref="menu" />
        <div v-ypopmenu:menu.click style="display: inline-block">ddd</div>
    </div>
</template>

<script>
import YPopmenu from './src/index';

export default {
    name: 'YPopmenuExample',
    components: {
        YPopmenu
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
    .y-popmenu_example {

    }
</style>
