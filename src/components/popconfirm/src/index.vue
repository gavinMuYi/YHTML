<template>
    <y-popper ref="pop" :clazz="`y-popconfirm ${clazz}`" :placement="placement" :priority="priority">
        <div :class="['y-popconfirm-content', {'y-popconfirm-content-withclose': withClose}]">
            <div class="y-popconfirm-close" v-if="withClose">
                <y-icon name="close" @click="close" />
            </div>
            <div class="y-popconfirm-detail">
                <slot>
                    {{ content }}
                </slot>
            </div>
            <div class="y-popconfirm-btn">
                <y-button @click="confirm" size="min" :status="status">{{ comfirmText }}</y-button>
                <y-button @click="cancel" size="min" status="default">{{ cancelText }}</y-button>
            </div>
        </div>
    </y-popper>
</template>

<script>
import YPopper from '@/components/popper';

export default {
    name: 'YPopconfirm',
    components: {
        YPopper
    },
    props: {
        clazz: {
            type: String,
            default: ''
        },
        withClose: {
            type: Boolean,
            default: true
        },
        status: {
            type: String,
            default: 'primary'
        },
        placement: {
            type: String,
            default: 'bottom-start'
        },
        priority: {
            type: Array,
            default: () => {
                return [];
            }
        },
        content: {
            type: String,
            default: ''
        },
        comfirmText: {
            type: String,
            default: '确定'
        },
        cancelText: {
            type: String,
            default: '取消'
        }
    },
    data() {
        return {
        };
    },
    methods: {
        close() {
            this.$refs.pop.closePop();
        },
        confirm() {
            this.$emit('confirm');
            this.close();
        },
        cancel() {
            this.$emit('cancel');
            this.close();
        }
    }
};
</script>

<style lang="less">
    .y-popconfirm {
        .y-popconfirm-content {
            width: 400px;
            min-height: 100px;
            position: relative;
            .y-popconfirm-close {
                position: absolute;
                right: -3px;
                top: -5px;
                cursor: pointer;
                &:hover {
                    .y-icon {
                        fill: @fontHighLight;
                    }
                }
            }
            .y-popconfirm-detail {
                padding: 0px 10px 40px;
            }
            .y-popconfirm-btn {
                position: absolute;
                bottom: 0px;
                right: 0px;
            }
        }
        .y-popconfirm-content-withclose {
            .y-popconfirm-detail {
                padding: 20px 10px 40px;
            }
        }
    }
</style>
