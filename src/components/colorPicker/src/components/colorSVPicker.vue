<template>
    <div class="y-color-sv-picker" :style="hRgb" ref="panel" @click="handleClick">
        <div class="y-color-s-picker_white"></div>
        <div class="y-color-s-picker_black"></div>
        <div class="y-color-sv-picker-box"
             :style="{
                 left: left + 'px',
                 top: top + 'px',
             }"
             @mousedown="handleMouseDown($event)">
        </div>
    </div>
</template>

<script>
import { throttle } from '@/utils/tools.js';

export default {
    name: 'YColorSVPicker',
    props: {
        hRgb: {
            type: Object,
            default: () => {
                return {};
            }
        },
        sValue: {
            type: Number,
            default: 0
        },
        vValue: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            startLeft: 0,
            startTop: 0,
            left: 0,
            top: 0,
            rangex: 100,
            rangey: 100
        };
    },
    computed: {
        s() {
            return (this.left / this.rangex) * 100;
        },
        v() {
            return (1 - (this.top / this.rangey)) * 100;
        }
    },
    watch: {
        sValue() {
            this.initLeftTop();
        },
        vValue() {
            this.initLeftTop();
        }
    },
    mounted() {
        this.getRange();
        this.initLeftTop();
    },
    methods: {
        getRange() {
            // resize
            this.rangex = Number(window.getComputedStyle(this.$refs.panel).width.replace('px', '')) - 4;
            this.rangey = Number(window.getComputedStyle(this.$refs.panel).height.replace('px', '')) - 4;
        },
        initLeftTop() {
            // value change
            this.left = (this.sValue / 100) * this.rangex;
            this.top = (1 - (this.vValue / 100)) * this.rangey;
        },
        handleClick(e) {
            let resx = e.clientX - this.$refs.panel.getBoundingClientRect().left;
            this.left = Math.max(0, Math.min(resx, this.rangex));
            let resy = e.clientY - this.$refs.panel.getBoundingClientRect().top;
            this.top = Math.max(0, Math.min(resy, this.rangey));
            this.$emit('change', [this.s, this.v]);
        },
        handleMouseMove(e) {
            return (e) => {
                this.rangex = Number(window.getComputedStyle(this.$refs.panel).width.replace('px', '')) - 4;
                this.rangey = Number(window.getComputedStyle(this.$refs.panel).height.replace('px', '')) - 4;
                let resx = e.clientX - this.startLeft;
                let resy = e.clientY - this.startTop;
                this.left = Math.max(0, Math.min(resx, this.rangex));
                this.top = Math.max(0, Math.min(resy, this.rangey));
                this.$emit('change', [this.s, this.v]);
            };
        },
        handleMouseDown(e, tindex, th) {
            this.startLeft = e.clientX - this.left;
            this.startTop = e.clientY - this.top;
            let moveEvent = throttle(this.handleMouseMove(e), 16);
            document.onselectstart = function () { return false };
            document.ondragstart = function () { return false };
            const handleMouseUp = () => {
                document.removeEventListener('mousemove', moveEvent);
                document.removeEventListener('mouseup', handleMouseUp);
                document.onselectstart = null;
                document.ondragstart = null;
            };
            document.addEventListener('mousemove', moveEvent);
            document.addEventListener('mouseup', handleMouseUp);
        },
    }
};
</script>

<style lang="less">
    .y-color-sv-picker {
        width: 300px;
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
        .y-color-sv-picker-box {
            cursor: pointer;
            position: absolute;
            width: 4px;
            height: 4px;
            box-shadow: 0 0 0 1.5px #fff;
            border-radius: 50%;
        }
    }
</style>
