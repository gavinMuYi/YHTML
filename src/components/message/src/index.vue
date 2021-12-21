<template>
    <transition name="y-message-status">
        <div :class="['y-message', clazz]" v-show="visible">
            <y-icon :name="iconName" />
            <div class="y-message-content">{{ content }}</div>
        </div>
    </transition>
</template>

<script>
import YIcon from '@/components/icon';

const ICON_MAP = {
    success: 'ok',
    error: 'close',
    warning: 'info',
    normal: 'question'
};

export default {
    name: 'YMessage',
    components: {
        YIcon
    },
    props: {
        duration: {
            type: Number,
            default: 2000
        },
        content: {
            type: String,
            default: ''
        },
        status: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            visible: false
        };
    },
    computed: {
        clazz() {
            return `y-message-${this.status}`;
        },
        iconName() {
            return ICON_MAP[this.status];
        }
    },
    watch: {
        visible(nval) {
            if (nval) {
                setTimeout(() => {
                    this.visible = false;
                    this.removeSelf();
                }, this.duration);
            }
        }
    },
    methods: {
        removeSelf() {
            setTimeout(() => {
                this.$destroy(true);
                this.$el.parentNode.removeChild(this.$el);
            }, 200);
        },
        show() {
            this.visible = true;
        }
    }
};
</script>

<style lang="less">
    .y-message {
        position: fixed;
        top: 0px;
        left: 50%;
        z-index: 100000000000;
        font-size: 14px;
        padding: 15px 80px;
        box-sizing: border-box;
        width: 400px;
        display: flex;
        justify-content: center;
        -webkit-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        transform: translateX(-50%);
        transition: opacity .2s linear;
        .y-message-content {
            max-width: 220px;
            word-wrap: break-word;
            color: @white;
        }
        .y-icon-content {
            margin-right: 5px;
            display: flex;
            align-items: center;
            .y-icon {
                fill: @white;
            }
        }
        &-success {
            background: @greenLight;
        }
        &-warning {
            background: @warningBackground;
        }
        &-error {
            background: @errorBackground;
        }
        &-normal {
            background: @gray;
            .y-message-content {
                color: @font;
            }
            .y-icon-content {
                .y-icon {
                    fill: @font;
                }
            }
        }
    }
    .y-message-status-enter,
    .y-message-status-leave-active {
        opacity: 0;
    }
</style>
