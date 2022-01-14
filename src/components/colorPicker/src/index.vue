<template>
    <div class="y-colorPicker">
        <y-color-s-v-picker :h-rgb="hRGB" :s-value="s" :v-value="v"
                            @change="val => { s = val[0]; v = val[1] }"/>
        <y-color-h-slider v-model="h" @background="val => { background = val }"/>
        <y-color-o-slider />
        HSV: {{ HSV }}
        RGB: {{ RGB }}
        HEX: {{ HEX }}
    </div>
</template>

<script>
// import { FormateAlltoHEX, hsvToRgb, rgbToHsv } from './formate';
import { FormateAlltoHEX, hsvToRgb } from './formate.js';
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
            h: 0, // 0 - 360
            s: 100,
            v: 100,
            background: [255, 0, 0]
        };
    },
    computed: {
        hRGB() {
            return {
                background: `rgb(${this.background.join(', ')})`
            };
        },
        RGB() {
            return hsvToRgb(this.HSV);
        },
        HSV() {
            return [this.h, this.s, this.v];
        },
        HEX() {
            return FormateAlltoHEX(`rgb(${this.RGB.join(', ')})`);
        }
    },
    methods: {
    }
};
</script>

<style lang="less">
    .y-colorPicker {
        .y-color-h-slider {
            margin-top: 5px;
        }
    }
</style>
