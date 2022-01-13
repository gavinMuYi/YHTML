<template>
    <div class="y-color-sv-picker">
        <div class="y-color-s-picker_white"></div>
        <div class="y-color-s-picker_black"></div>
    </div>
</template>

<script>
export default {
    name: 'YColorSVPicker',
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
    .y-color-sv-picker {
        width: 100%;
        height: 200px;
        min-width: 200px;
        position: relative;
        .y-color-s-picker_white {
            cursor: pointer;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(to right, #fff, rgba(255,255,255,0));
        }
        .y-color-s-picker_black {
            cursor: pointer;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(to top, #000, rgba(0,0,0,0));
        }
    }
</style>
