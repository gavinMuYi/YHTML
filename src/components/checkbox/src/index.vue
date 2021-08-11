<template>
    <span class="y-checkbox" @click="handleClick">
        <div :class="['check-icon', {'all': status === 'all'}]">
            <YIcon name="check" v-if="status === 'all'" />
            <div class="half" v-if="status === 'half'"></div>
        </div>
        <div v-if="label" class="label">{{ label }}</div>
    </span>
</template>

<script>
import YIcon from '@/components/icon';

export default {
    name: 'YCheckbox',
    components: {
        YIcon
    },
    props: {
        label: {
            type: String,
            default: ''
        },
        status: {
            type: String,
            default: 'empty' // empty, half, all
        }
    },
    methods: {
        handleClick() {
            this.$emit('change');
        }
    }
};
</script>

<style lang="less">
    .y-checkbox {
        .check-icon {
            width: 14px;
            height: 14px;
            display: inline-block;
            border: 1px solid #dadada;
            border-radius: 2px;
            position: relative;
            .half {
                width: 6px;
                height: 6px;
                border-radius: 1px;
                position: absolute;
                top: 4px;
                left: 4px;
                background: #18b9ac;
            }
        }
        .all {
            background: #18b9ac;
            .y-icon {
                width: 10px;
                height: 10px;
                position: absolute;
                top: 2px;
                left: 2px;
                fill: #dadada;
            }
        }
        .label {
            display: inline-block;
            margin-left: 5px;
        }
    }
</style>
