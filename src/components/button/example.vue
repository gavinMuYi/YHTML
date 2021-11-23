<template>
    <div class="y-button_example">
        <y-button size="max" status="default" disable>按钮</y-button>
        <y-button size="max" status="default" disable loading>按钮</y-button>
        <y-button size="max" status="default" >按钮</y-button>
        <y-button size="medium" status="warning" >按钮</y-button>
        <y-button size="medium" status="error" >按钮</y-button>
        <y-button size="min" status="primary" >按钮</y-button>
    </div>
</template>
<script>
import YButton from './src/index';
export default {
    name: 'YButtonExample',
    components: {
        YButton
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
    .y-button_example {

    }
</style>
