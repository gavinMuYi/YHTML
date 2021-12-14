<template>
    <div class="y-tip">
        <y-popper ref="pop" :clazz="`y-tip y-tip-${kind} ${clazz}`" :placement="placement" :priority="priority">
            <slot></slot>
        </y-popper>
    </div>
</template>

<script>
import YPopper from '@/components/popper';

export default {
    name: 'YTip',
    components: {
        YPopper
    },
    props: {
        clazz: {
            type: String,
            default: ''
        },
        kind: {
            type: String,
            default: 'tiny' // tiny, large
        },
        placement: {
            type: String,
            default: 'top-middle'
        },
        priority: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    data() {
        return {
        };
    },
    methods: {
    }
};
</script>

<style lang="less">
    .y-tip {

    }
    .y-tip-tiny {
        background: @blackGreen!important;
        padding: 5px!important;
        font-size: 12px;
        font-weight: 300;
        color: @white;
    }
</style>
