<template>
    <div class="y-colorPicker">
        {{ h }}
        <y-color-s-v-picker :h-rgb="hRGB"/>
        <y-color-h-slider v-model="h" @background="val => {background = val}"/>
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
            h: 0,
            background: [255, 0, 0]
        };
    },
    computed: {
        hRGB() {
            return {
                background: `rgb(${this.background.join(', ')})`
            };
        }
    },
    methods: {
    }
};
</script>

<style lang="less">
    .y-colorPicker {

    }
</style>
