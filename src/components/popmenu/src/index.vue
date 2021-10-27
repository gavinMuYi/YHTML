<template>
    <div class="y-popmenu">
        <y-popper ref="pop">
            111
        </y-popper>
    </div>
</template>

<script>
import YPopper from '@/components/popper';

export default {
    name: 'YPopmenu',
    components: {
        YPopper
    },
    props: {
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
    .y-popmenu {

    }
</style>
