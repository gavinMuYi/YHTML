<template>
    <div :class="[
        'y-button',
        `y-button_${status}`,
        `y-button_${size}`,
        { 'y-button_disable': disable }
    ]">
        <div class="btn-loading" v-if="loading">
            <y-icon name="loading" />
        </div>
        <slot />
    </div>
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
    }
};
</script>

<style lang="less">
    .y-button {
        cursor: pointer;
        display: inline-block;
        box-sizing: border-box;
        position: relative;
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
    .y-button_default {
        background: @lightGray;
        color: @font;
        border: 1px solid @commonGray;
        .btn-loading {
            background: @lightGray;
        }
        &:hover {
            border: 1px solid @deepGreen;
        }
    }
    .y-button_primary {
        background: @fontHighLight;
        color: @white;
        &:hover {
            background: @greenLight;
        }
        .btn-loading {
            background: @fontHighLight;
        }
    }
    .y-button_warning {
        background: @warning;
        color: @font;
        &:hover {
            background: @warningLight;
        }
        .btn-loading {
            background: @warning;
        }
    }
    .y-button_error {
        background: @errorDeep;
        color: @white;
        &:hover {
            background: @error;
        }
        .btn-loading {
            background: @errorDeep;
        }
    }
    .y-button_min {
        font-size: 12px;
        padding: 5px 12px;
        border-radius: 2px;
        .btn-loading {
            border-radius: 2px;
        }
    }
    .y-button_medium {
        font-size: 16px;
        padding: 8px 18px;
        border-radius: 3px;
        .btn-loading {
            border-radius: 3px;
        }
    }
    .y-button_max {
        font-size: 20px;
        padding: 10px 30px;
        border-radius: 5px;
        .btn-loading {
            border-radius: 5px;
        }
    }
</style>
