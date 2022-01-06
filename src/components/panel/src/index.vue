<template>
    <div class="y-panel" v-if="show" @click="close">
        <div :class="'y-panel-content_' + position" @click.stop>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'YPanel',
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        position: {
            type: String,
            default: 'right'
        }
    },
    data() {
        return {
            show: this.visible
        };
    },
    watch: {
        visible(nval) {
            this.show = nval;
        },
        show(nval) {
            this.$emit('visibleChange', nval);
        }
    },
    mounted() {
        this.$nextTick(() => {
            const body = document.querySelector('body');
            if (body.append) {
                body.append(this.$el);
            } else {
                body.appendChild(this.$el);
            }
        });
    },
    methods: {
        close() {
            this.show = false;
        },
        open() {
            this.show = true;
        }
    }
};
</script>

<style lang="less">
    .y-panel {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: @backgroundDeepGreenHoverOpacity;
        z-index: 100000000000;
        .y-panel-content_left,
        .y-panel-content_right {
            position: absolute;
            width: 800px;
            height: 100%;
            background: @white;
        }
        .y-panel-content_left {
            left: 0;
            border-right: solid 1px @gray;
        }
        .y-panel-content_right {
            right: 0;
            border-left: solid 1px @gray;
        }
        .y-panel-content_top,
        .y-panel-content_bottom {
            left: 0;
            position: absolute;
            width: 100%;
            height: 500px;
            background: @white;
        }
        .y-panel-content_top {
            top: 0;
            border-bottom: solid 1px @gray;
        }
        .y-panel-content_bottom {
            bottom: 0;
            border-top: solid 1px @gray;
        }
    }
</style>
