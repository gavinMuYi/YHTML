<template>
    <div class="y-dialog" v-if="show">
        <div class="y-dialog-content">
            <y-icon name="close" class="y-dialog-close" @click="close" />
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'YDialog',
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        value: {
            type: Boolean,
            default: false
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
        value(nval) {
            this.show = nval;
        },
        show(nval) {
            this.$emit('visibleChange', nval);
            this.$emit('input', nval);
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
    .y-dialog {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: @backgroundDeepGreenHoverOpacity;
        z-index: 100000000000;
        .y-dialog-content {
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            min-height: 200px;
            min-width: 200px;
            background: @white;
            .y-dialog-close {
                position: absolute;
                right: 5px;
                top: 5px;
                &:hover {
                    cursor: pointer;
                    fill: @fontHighLight;
                }
            }
        }
    }
</style>
