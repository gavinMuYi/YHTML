<template>
    <div class="y-color-o-slider" ref="slider"
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
    name: 'YColorOSlider',
    props: {
        value: {
            type: Number,
            default: 100
        }
    },
    data() {
        return {
            start: 0,
            left: 0,
            range: 0
        };
    },
    computed: {
        opacity() {
            return Math.round((this.left / this.range) * 100);
        }
    },
    watch: {
        value() {
            this.initLeft();
        }
    },
    mounted() {
        this.getRange();
        this.initLeft();
    },
    methods: {
        getRange() {
            // resize
            this.range = Number(window.getComputedStyle(this.$refs.slider).width.replace('px', '')) - 6;
        },
        initLeft() {
            // value change
            this.left = (this.value / 100) * this.range;
        },
        handleClick(e) {
            let res = e.clientX - this.$refs.slider.getBoundingClientRect().left;
            this.left = Math.max(0, Math.min(res, this.range));
            this.$emit('input', this.opacity);
        },
        handleMouseMove(e) {
            return (e) => {
                let res = e.clientX - this.start;
                this.left = Math.max(0, Math.min(res, this.range));
                this.$emit('input', this.opacity);
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
    .y-color-o-slider {
        position: relative;
        cursor: pointer;
        height: 8px;
        min-width: 200px;
        width: 300px;
        background: linear-gradient(to left, #000, rgba(0,0,0,0));
        border-top: 1px solid #eaeefb;
        border-bottom: 1px solid #eaeefb;
        .y-color-slider-box {
            position: absolute;
            top: -4px;
            left: 0px;
            height: 14px;
            width: 4px;
            background: #ffffff;
            border-radius: 3px;
            border: 1px solid #dadee7;
        }
    }
</style>
