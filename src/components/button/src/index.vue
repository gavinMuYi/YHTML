<template>
    <button :class="[
        'y-button',
        `y-button_${status}`,
        `y-button_${size}`,
        { 'y-button_disable': disable },
        { 'y-button_loading': loading }
    ]" @click="click">
        <div class="btn-loading" v-if="loading">
            <y-icon name="loading" />
        </div>
        <span :style="{
            opacity: loading ? 0 : 1
        }"><slot /></span>
    </button>
</template>

<script>
import YIcon from '@/components/icon';

export default {
    name: 'YButton',
    components: {
        YIcon
    },
    props: {
        status: {
            type: String,
            default: 'default' // default,primary,warning,error
        },
        size: {
            type: String,
            default: 'medium' // min,medium,max
        },
        loading: {
            type: Boolean,
            default: false
        },
        disable: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
        };
    },
    methods: {
        click(e) {
            this.$emit('click', e);
        }
    }
};
</script>

<style lang="less">
    .y-button {
        cursor: pointer;
        display: inline-block;
        box-sizing: border-box;
        position: relative;
        border: none;
        box-shadow: 1px 2px 2px @gray;
        .btn-loading {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    .y-button_disable {
        opacity: 0.5;
        pointer-events: none;
    }
    .y-button_loading {
        pointer-events: none;
    }
    .y-button_default {
        background: @lightGray;
        &>span {
            color: @font;
        }
        border: 1px solid @commonGray;
        &:hover {
            border: 1px solid @fontGray;
        }
    }
    .y-button_primary {
        background: @fontHighLight;
        &>span {
            color: @white;
        }
        &:hover {
            background: @greenLight;
        }
    }
    .y-button_warning {
        background: @warning;
        &>span {
            color: @font;
        }
        &:hover {
            background: @warningLight;
        }
    }
    .y-button_error {
        background: @errorDeep;
        &>span {
            color: @white;
        }
        &:hover {
            background: @error;
        }
    }
    .y-button_min {
        font-size: 12px;
        padding: 5px 12px;
        border-radius: 3px;
    }
    .y-button_medium {
        font-size: 16px;
        padding: 8px 18px;
        border-radius: 3px;
    }
    .y-button_max {
        font-size: 20px;
        padding: 10px 30px;
        border-radius: 5px;
    }
</style>
