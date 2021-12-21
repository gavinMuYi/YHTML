<template>
    <div class="y-toast">
        <div class="y-toast-close" v-if="withClose">
            <y-icon name="close" @click="close" />
        </div>
        <slot>
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
                <div class="y-toast-btn" v-if="comfirmText">
                    <y-button @click="close">{{ comfirmText }}</y-button>
                </div>
            </div>
        </slot>
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
        }
    },
    data() {
        return {
        };
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
        top: 0px;
        left: 50%;
        z-index: 100000000000;
        -webkit-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        transform: translateX(-50%);
    }
</style>
