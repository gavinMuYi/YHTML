<template>
    <div class="y-colorPicker">
        <y-tip ref="cssName" :z-index="500" placement="top">
            <template slot-scope="props">
                <span>{{ props.data }}</span>
            </template>
        </y-tip>
        <y-popper ref="colorPicker" clazz="y-colorPicker-pop" :placement="placement">
            <div class="y-colorPicker-pop-content">
                <y-color-s-v-picker :h-rgb="hRGB" :s-value="s" :v-value="v"
                                    @change="val => { s = val[0]; v = val[1] }"/>
                <y-color-h-slider v-model="h" @background="val => { background = val }"/>
                <y-color-o-slider v-model="o" />
                <div class="quick-input">
                    <div class="color-input">
                        <div class="input-label">rgba: </div>
                        <y-input :value="[...this.inputRGB, this.o / 100].join(', ')" @change="handleRGBA($event)" />
                    </div>
                    <div class="color-input">
                        <div class="input-label">HEX: </div>
                        <y-input :value="inputHEX + Opacity[o]" @change="handleHEX" />
                    </div>
                </div>
                <div class="quick-picker">
                    <div class="color-item"
                         v-for="color in ColorValue"
                         :key="color.key"
                         :style="{ background: color.value }"
                         v-ytip.hover:cssName="{data: color.key}"
                         @click="handleHEX(color.value)">
                    </div>
                </div>
            </div>
        </y-popper>
        <div class="y-color-picker-trigger" v-ypop:colorPicker.click>
            <div class="y-color-picker-trigger-preview" :style="{ background: color.HEX }"></div>
        </div>
    </div>
</template>

<script>
import clone from 'clone';
import { FormateAlltoHEX, hsvToRgb, Opacity, rgbToHsv, hex2rgb, ColorValueMap, ColorValue } from './formate.js';
import YTip from '@/components/tip';
import YPopper from '@/components/popper';
import YColorSVPicker from './components/colorSVPicker';
import YColorHSlider from './components/colorHslider';
import YColorOSlider from './components/colorOslider';

export default {
    name: 'YColorPicker',
    components: {
        YTip,
        YPopper,
        YColorSVPicker,
        YColorHSlider,
        YColorOSlider
    },
    props: {
        value: {
            type: String,
            default: '#000000'
        },
        placement: {
            type: String,
            default: 'bottom-start'
        }
    },
    data() {
        return {
            h: 0, // 0 - 360
            s: 100,
            v: 100,
            o: 100,
            background: [255, 0, 0],
            Opacity,
            ColorValue,
            inputRGB: [0, 0, 0],
            inputHEX: '#000000',
            tempValue: '',
            byhand: false
        };
    },
    computed: {
        hRGB() {
            return {
                background: `rgb(${this.background.join(', ')})`
            };
        },
        RGB() {
            let res = hsvToRgb(this.HSV);
            if (!this.byhand) {
                this.$set(this, 'inputRGB', clone(res));
            } else {
                this.byhand = false;
            }
            return res;
        },
        HSV() {
            return [this.h, this.s, this.v];
        },
        HEX() {
            return FormateAlltoHEX(`rgb(${this.RGB.join(', ')})`);
        },
        color() {
            this.tempValue = this.RGB + this.HEX;
            return {
                HSV: this.HSV.map(val => { return Math.round(val) }),
                rgba: [...this.inputRGB, this.o / 100],
                HEX: this.inputHEX + Opacity[this.o],
                opacity: this.o
            };
        }
    },
    watch: {
        color(nval) {
            this.$emit('change', nval);
        },
        value(nval) {
            this.initValue();
        },
        inputRGB(nval) {
            let res = FormateAlltoHEX(`rgb(${nval.join(', ')})`);
            if (this.inputHEX !== res) {
                this.$set(this, 'inputHEX', res);
            }
        },
        inputHEX(nval) {
            let res = hex2rgb(nval);
            if (this.inputRGB.join(',') !== res.join(',')) {
                this.$set(this, 'inputRGB', clone(res));
            }
        }
    },
    mounted() {
        this.initValue();
    },
    methods: {
        initValue() {
            let str = this.value;
            if (str.substring(0, 3) === 'rgb') {
                let arr = str.split(',');
                let r = arr[0].replace('rgb(', '').replace('rgba(', '').trim();
                let g = arr[1].trim();
                let b = arr[2].replace(')', '').trim();
                let o = arr[3] ? arr[3].replace(')', '').trim() : 1;
                this.handleRGBA(`${r}, ${g}, ${b}, ${o}`);
                this.initRGB([r, g, b]);
            } else if (str.substring(0, 1) === '#') {
                this.handleHEX(str);
                this.initHEX(str.substring(0, 7));
            } else {
                this.handleHEX(ColorValueMap[str]);
                this.initHEX(ColorValueMap[str]);
            }
        },
        initRGB(val) {
            this.inputRGB = clone(val);
        },
        initHEX(val) {
            this.inputHEX = val;
        },
        handleRGBA(val) {
            let nval = val.split(', ');
            this.o = Math.round(Number(nval[3]) * 100);
            let hsv = rgbToHsv([Number(nval[0]), Number(nval[1]), Number(nval[2])]);
            this.initRGB([Number(nval[0]), Number(nval[1]), Number(nval[2])]);
            this.byhand = true;
            this.h = Number(hsv[0]);
            this.s = Number(hsv[1]);
            this.v = Number(hsv[2]);
            this.setBackground();
        },
        handleHEX(val) {
            let hexVal = val.slice(0, 7);
            this.initHEX(hexVal);
            let oVal = val.slice(7, 9);
            this.o = Number(Opacity.indexOf(oVal));
            let hsv = rgbToHsv(hex2rgb(hexVal));
            this.byhand = true;
            this.h = Number(hsv[0]);
            this.s = Number(hsv[1]);
            this.v = Number(hsv[2]);
            this.setBackground();
        },
        setBackground() {
            this.background = hsvToRgb([this.h, 100, 100]);
        }
    }
};
</script>

<style lang="less">
    .y-colorPicker {
        .y-color-picker-trigger {
            display: inline-block;
            width: 80px;
            height: 30px;
            padding: 5px;
            border: 1px solid #dadee7;
            border-radius: 2px;
            .y-color-picker-trigger-preview {
                height: 100%;
            }
        }
    }
    .y-colorPicker-pop {
        margin-top: 2px;
        background: #ffffff;
        padding: 20px;
        border: 1px solid #dadee7;
        border-radius: 2px;
        box-shadow: 0 1px 15px rgba(30, 36, 49, 0.15);
        .y-colorPicker-pop-content {
            width: 300px;
            .color-input,
            .y-color-o-slider,
            .y-color-h-slider {
                margin-top: 5px;
            }
            .quick-input {
                margin-top: 10px;
                .color-input {
                    .y-input {
                        width: 225px;
                    }
                    .input-label {
                        color: #1e2330;
                        margin-bottom: 10px;
                        display: inline-block;
                        width: 70px;
                    }
                }
            }
            .quick-picker {
                margin-top: 10px;
                .color-item {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    border-radius: 3px;
                    border: 1px solid #dadee7;
                    margin: 0px 5px 5px 0;
                    cursor: pointer;
                }
            }
        }
    }
</style>
