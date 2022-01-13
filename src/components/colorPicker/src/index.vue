<template>
    <div class="y-colorPicker">
        <y-color-s-v-picker />
        <y-color-h-slider />
        <y-color-o-slider />
    </div>
</template>

<script>
import YColorSVPicker from './components/colorSVPicker';
import YColorHSlider from './components/colorHslider';
import YColorOSlider from './components/colorOslider';

export default {
    name: 'YColorPicker',
    components: {
        YColorSVPicker,
        YColorHSlider,
        YColorOSlider
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
    .y-colorPicker {

    }
</style>
