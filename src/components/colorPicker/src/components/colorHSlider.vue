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
const GAP = 100 / 6;

export default {
    name: 'YColorHSlider',
    props: {
        value: {
            type: Number,
            default: 0 // 0 - 360
        }
    },
    data() {
        return {
            range: 0,
            start: 0,
            left: 0
        };
    },
    computed: {
        h() {
            return 360 * this.left / this.range;
        },
        percent() {
            return 100 * this.left / this.range;
        },
        r() {
            if (this.percent >= 0 && this.percent <= GAP) {
                return 255;
            } else if (this.percent > GAP && this.percent <= 2 * GAP) {
                return (1 - ((this.percent - GAP) / GAP)) * 255;
            } else if (this.percent > 2 * GAP && this.percent <= 3 * GAP) {
                return 0;
            } else if (this.percent > 3 * GAP && this.percent <= 4 * GAP) {
                return 0;
            } else if (this.percent > 4 * GAP && this.percent <= 5 * GAP) {
                return ((this.percent - (4 * GAP)) / GAP) * 255;
            } else if (this.percent > 5 * GAP && this.percent <= 6 * GAP) {
                return 255;
            }
        },
        g() {
            if (this.percent >= 0 && this.percent <= GAP) {
                return (this.percent / GAP) * 255;
            } else if (this.percent > GAP && this.percent <= 2 * GAP) {
                return 255;
            } else if (this.percent > 2 * GAP && this.percent <= 3 * GAP) {
                return 255;
            } else if (this.percent > 3 * GAP && this.percent <= 4 * GAP) {
                return (1 - ((this.percent - (3 * GAP)) / GAP)) * 255;
            } else if (this.percent > 4 * GAP && this.percent <= 5 * GAP) {
                return 0;
            } else if (this.percent > 5 * GAP && this.percent <= 6 * GAP) {
                return 0;
            }
        },
        b() {
            if (this.percent >= 0 && this.percent <= GAP) {
                return 0;
            } else if (this.percent > GAP && this.percent <= 2 * GAP) {
                return 0;
            } else if (this.percent > 2 * GAP && this.percent <= 3 * GAP) {
                return ((this.percent - (2 * GAP)) / GAP) * 255;
            } else if (this.percent > 3 * GAP && this.percent <= 4 * GAP) {
                return 255;
            } else if (this.percent > 4 * GAP && this.percent <= 5 * GAP) {
                return 255;
            } else if (this.percent > 5 * GAP && this.percent <= 6 * GAP) {
                return (1 - ((this.percent - (5 * GAP)) / GAP)) * 255;
            }
        },
        color() {
            return [Math.abs(Math.round(this.r)), Math.abs(Math.round(this.g)), Math.abs(Math.round(this.b))];
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
            this.left = (this.value / 360) * this.range;
        },
        handleClick(e) {
            let res = e.clientX - this.$refs.slider.getBoundingClientRect().left;
            this.left = Math.max(0, Math.min(res, this.range));
            this.$emit('background', this.color);
            this.$emit('input', this.h);
        },
        handleMouseMove(e) {
            return (e) => {
                let res = e.clientX - this.start;
                this.left = Math.max(0, Math.min(res, this.range));
                this.$emit('background', this.color);
                this.$emit('input', this.h);
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
