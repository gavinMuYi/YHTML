<template>
    <div :class="clazz">
        <y-icon :name="leftIcon" v-if="leftIcon" class="left-icon">
        </y-icon>
        <y-icon name="clear" v-if="quickClear" class="right-icon" @click="clear">
        </y-icon>
        <input ref="input" :type="type" v-model="currentValue" :autofocus="autofocus"
               @blur="handleBlur" @focus="handleFocus"
               @change="handleChange" />
    </div>
</template>

<script>
import YIcon from '@/components/icon';

export default {
    name: 'YInput',
    components: {
        YIcon
    },
    props: {
        value: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        reg: {
            type: RegExp,
            default: null
        },
        autofocus: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'medium' // min,medium,max
        },
        leftIcon: {
            type: String,
            default: ''
        },
        quickClear: {
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
            currentValue: this.value,
            tempValue: this.value,
            regCheckedValue: this.value
        };
    },
    computed: {
        clazz() {
            return [
                'y-input',
                `y-input_${this.size}`,
                { 'y-input_withLeftIcon': this.leftIcon },
                { 'y-input_withRightIcon': this.quickClear },
                { 'y-input_disable': this.disable }
            ];
        }
    },
    watch: {
        value(nval, oVal) {
            if (this.currentValue !== nval) {
                this.tempValue = nval;
                this.currentValue = nval;
            }
        },
        currentValue(val) {
            if (this.reg !== null && this.isRegExp(this.reg)) {
                if (!this.reg.test(val)) {
                    this.currentValue = this.regCheckedValue;
                } else {
                    this.regCheckedValue = this.currentValue;
                    this.$emit('input', this.regCheckedValue);
                }
            }
            else {
                this.$emit('input', val);
            }
        }
    },
    methods: {
        isRegExp(v) {
            return toString.call(v) === '[object RegExp]';
        },
        handleFocus(e) {
            this.$emit('focus', e, this.currentValue);
        },
        handleBlur(e) {
            this.$emit('blur', e, this.currentValue);
        },
        handleChange(e) {
            this.$emit('change', this.currentValue);
        },
        clear() {
            this.currentValue = '';
            this.handleChange();
        }
    }
};
</script>

<style lang="less">
    .y-input {
        display: inline-block;
        position: relative;
        input {
            color: #3a3a3a;
            width: 100%;
            box-sizing: border-box;
            border: 1px solid @gray;
            &:hover {
                border: 1px solid @deepGreen;
            }
            &:focus {
                outline: none;
                border: 1px solid @greenLight;
            }
        }
        .y-icon {
            fill: @font;
        }
        .right-icon {
            display: none;
            cursor: pointer;
            &:hover {
                fill: @fontHighLight;
            }
        }
        &:hover {
            .right-icon {
                display: inline-block;
            }
        }
    }
    .y-input_min {
        width: 150px;
        input {
            font-size: 12px;
            padding: 9px;
            height: 30px;
            border-radius: 5px;
        }
        &.y-input_withLeftIcon {
            input {
                padding-left: 30px;
            }
            .left-icon {
                width: 12px;
                height: 12px;
                position: absolute;
                padding: 9px;
            }
        }
        &.y-input_withRightIcon {
            input {
                padding-right: 30px;
            }
            .right-icon {
                width: 12px;
                height: 12px;
                position: absolute;
                right: 0;
                padding: 9px;
            }
        }
    }
    .y-input_medium {
        width: 200px;
        input {
            font-size: 16px;
            padding: 10px;
            height: 36px;
            border-radius: 5px;
        }
        &.y-input_withLeftIcon {
            input {
                padding-left: 36px;
            }
            .left-icon {
                width: 16px;
                height: 16px;
                position: absolute;
                padding: 10px;
            }
        }
        &.y-input_withRightIcon {
            input {
                padding-right: 36px;
            }
            .right-icon {
                width: 16px;
                height: 16px;
                position: absolute;
                right: 0;
                padding: 10px;
            }
        }
    }
    .y-input_max {
        width: 300px;
        input {
            font-size: 20px;
            padding: 14px;
            height: 44px;
            border-radius: 8px;
        }
        &.y-input_withLeftIcon {
            input {
                padding-left: 48px;
            }
            .left-icon {
                width: 20px;
                height: 20px;
                position: absolute;
                padding: 14px;
            }
        }
        &.y-input_withRightIcon {
            input {
                padding-right: 48px;
            }
            .right-icon {
                width: 20px;
                height: 20px;
                position: absolute;
                right: 0;
                padding: 14px;
            }
        }
    }
    .y-input_disable {
        opacity: 0.5;
        pointer-events: none;
    }
</style>
