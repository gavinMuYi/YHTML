<template>
    <div class="y-color-h-slider" ref="slider"
         @click="handleClick($event)">
        <div
            class="y-color-slider-box"
            :style="{ left: left + 'px' }"
            @mousedown="handleMouseDown($event)"></div>
    </div>
</template>

<script>
import { throttle } from '@/utils/tools.js';

export default {
    name: 'YColorHSlider',
    props: {
    },
    data() {
        return {
            range: 0,
            start: 0,
            left: 0,
        };
    },
    mounted() {
        this.getRange();
        this.initLeft();
    },
    methods: {
        getRange() {
            this.range = Number(window.getComputedStyle(this.$refs.slider).width.replace('px', '')) - 6;
        },
        initLeft() {
            //
        },
        handleClick(e) {
            let res = e.clientX - this.$refs.slider.getBoundingClientRect().left;
            this.left = Math.max(0, Math.min(res, this.range));
        },
        handleMouseMove(e) {
            return (e) => {
                let res = e.clientX - this.start;
                this.left = Math.max(0, Math.min(res, this.range));
            };
        },
        handleMouseDown(e, tindex, th) {
            this.start = e.clientX - this.left;
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
    .y-color-h-slider {
        position: relative;
        cursor: pointer;
        height: 10px;
        min-width: 200px;
        background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
        .y-color-slider-box {
            position: absolute;
            top: -2px;
            left: 0px;
            height: 14px;
            width: 4px;
            background: @white;
            border-radius: 3px;
            border: 1px solid @fontGray;
        }
    }
</style>
