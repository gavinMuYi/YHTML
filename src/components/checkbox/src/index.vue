<template>
    <span class="y-checkbox" @click="handleClick">
        <div :class="['check-icon', {'all': currentStatus === 'all'}]">
            <y-icon name="check" v-if="currentStatus === 'all'" />
            <div class="half" v-if="currentStatus === 'half'"></div>
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
    data() {
        return {
            currentStatus: this.status
        };
    },
    watch: {
        status(nval) {
            this.currentStatus = nval;
        }
    },
    methods: {
        handleClick() {
            if (this.currentStatus === 'all' || this.currentStatus === 'half') {
                this.currentStatus = 'empty';
            } else {
                this.currentStatus = 'all';
            }
            this.$emit('change', this.currentStatus);
        }
    }
};
</script>

<style lang="less">
    .y-checkbox {
        cursor: pointer;
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
            font-size: 14px;
            position: relative;
            top: -3px;
        }
    }
</style>
