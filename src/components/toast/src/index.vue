<template>
    <div :class="[
        'y-toast',
        `y-toast-${placement}`,
        `y-toast-${status}`,
        {'y-toast-with_btn': comfirmText},
        {'y-toast-middle': iconName}
    ]">
        <div class="y-toast-close" v-if="withClose">
            <y-icon name="close" @click="close" />
        </div>
        <div class="y-toast-content">
            <div class="y-toast-icon" v-if="iconName">
                <y-icon :name="iconName" />
            </div>
            <div class="y-toast-title" v-if="title">
                {{ title }}
            </div>
            <div class="y-toast-detail" v-if="detail">
                {{ detail }}
            </div>
        </div>
        <div class="y-toast-btn" v-if="comfirmText">
            <y-button @click="close" size="min" :status="btnStatus">{{ comfirmText }}</y-button>
        </div>
    </div>
</template>

<script>
import YIcon from '@/components/icon';
import YButton from '@/components/button';

export default {
    name: 'YToast',
    components: {
        YIcon,
        YButton
    },
    props: {
        withClose: {
            type: Boolean,
            default: true
        },
        iconName: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        detail: {
            type: String,
            default: ''
        },
        comfirmText: {
            type: String,
            default: ''
        },
        placement: {
            type: String,
            default: 'top' // top, center
        },
        status: {
            type: String,
            default: 'normal' // error, warning, success
        }
    },
    computed: {
        btnStatus() {
            const map = {
                normal: 'default',
                success: 'primary',
                warning: 'primary',
                error: 'error'
            };
            return map[this.status];
        }
    },
    methods: {
        close() {
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);
        }
    }
};
</script>

<style lang="less">
    .y-toast {
        position: fixed;
        left: 50%;
        z-index: 100000000000;
        -webkit-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        transform: translateX(-50%);
        width: 500px;
        min-height: 50px;
        padding: 20px;
        box-sizing: border-box;
        background: @white;
        border: 1px solid @gray;
        border-radius: 5px;
        box-shadow: 2px 4px 10px 0 rgba(30, 35, 48, 0.08);
        .y-toast-close {
            position: absolute;
            right: 10px;
            top: 5px;
            cursor: pointer;
            &:hover {
                .y-icon {
                    fill: @fontHighLight;
                }
            }
        }
        .y-toast-btn {
            position: absolute;
            bottom: 12px;
            right: 20px;
        }
        .y-toast-title {
            font-size: 20px;
            font-weight: 500;
            margin-bottom: 5px;
        }
        .y-toast-icon {
            .y-icon {
                width: 150px;
                height: 150px;
            }
            margin-top: 20px;
            margin-bottom: 30px;
        }
    }
    .y-toast-top {
        top: 0px;
    }
    .y-toast-center {
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }
    .y-toast-with_btn {
        padding-bottom: 50px;
    }
    .y-toast-middle {
        .y-toast-icon,
        .y-toast-title,
        .y-toast-detail {
            text-align: center;
        }
        .y-toast-btn {
            left: 50%;
            right: auto;
            -webkit-transform: translateX(-50%);
            -moz-transform: translateX(-50%);
            -ms-transform: translateX(-50%);
            transform: translateX(-50%);
        }
    }
    .y-toast-normal {
        .y-toast-content {
            .y-icon {
                fill: @fontGray;
            }
        }
    }
    .y-toast-error {
        .y-toast-content {
            .y-icon {
                fill: @errorBackground;
            }
        }
    }
    .y-toast-warning {
        .y-toast-content {
            .y-icon {
                fill: @warningBackground;
            }
        }
    }
    .y-toast-success {
        .y-toast-content {
            .y-icon {
                fill: @fontHighLight;
            }
        }
    }
</style>
