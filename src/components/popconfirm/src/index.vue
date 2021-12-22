<template>
    <y-popper ref="pop" :clazz="`y-popconfirm ${clazz}`" :placement="placement" :priority="priority">
        <div>
            <slot></slot>
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
        placement: {
            type: String,
            default: 'bottom-middle'
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
    .y-popconfirm {

    }
</style>
