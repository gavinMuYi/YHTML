<template>
    <div class="y-color-h-slider"></div>
</template>

<script>
export default {
    name: 'YColorHSlider',
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
    .y-color-h-slider {
        cursor: pointer;
        height: 10px;
        width: 100%;
        min-width: 200px;
        background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
    }
</style>
