<template>
    <div class="y-popmenu_example">
        <y-popmenu ref="menu" :options="[{key: 'sd', label: 'fsdf'}]" />
        <div v-ypopmenu:menu.click style="display: inline-block">trigger</div>
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
