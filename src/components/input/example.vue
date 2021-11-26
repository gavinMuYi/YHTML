<template>
    <div class="y-input_example">
        <y-input size="max" />
        <y-input @blur="handler" @focus="handler" @change="handler" @input="handler" />
        <y-input size="min" type="password" leftIcon="search" quickClear />
    </div>
</template>

<script>
import YInput from './src/index';
export default {
    name: 'YInputExample',
    components: {
        YInput
    },
    data() {
        return {
        };
    },
    methods: {
        handler(e, val) {
            console.log(e, val);
        }
    }
};
</script>

<style lang="less">
    .y-input_example {

    }
</style>
