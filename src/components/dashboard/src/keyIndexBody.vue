<template>
    <div :class="['key-index-body', columns ? ''
    : separateWidth ? 'separate-key-index-body' : 'default-key-index-body']">
        <div :class="[columns ? '' : options.mainPart ? 'main-part' : 'part-part', 'body-content']" ref="totalHeight">
            <div :class="['tab', {'column-tab': columns},
                          {'column-tab-line': columns && index >= columns}]"
                 v-for="(tab, index) in options.tabs" :key="'tab' + index"
                 :style="columns ? {width: 100 / columns + '%'} : separateStyle(index)"
                 ref="tabContent" >
                <key-index-tab :options="tab" @innerEmit="handleInnerEmit" @stepHeight="computeHeight" ref="tabs" />
            </div>
        </div>
    </div>
</template>

<script>
import KeyIndexTab from './keyIndexTab';

export default {
    name: 'KeyIndexBody',
    components: {
        KeyIndexTab
    },
    props: {
        options: {
            type: Object,
            default: () => {
                return {};
            }
        },
        separateWidth: {
            type: Number,
            default: 0
        },
        simpler: {
            type: Boolean,
            default: false
        },
        columns: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            heightGroup: [],
            minHeightGroup: []
        };
    },
    methods: {
        separateStyle(index) {
            if (!this.separateWidth || this.options.tabs.length < 2) {
                let min_width_style = '';
                if (this.simpler) {
                    min_width_style = 'min-height: 90px;';
                }
                return min_width_style + `width: ${100 / this.options.tabs.length}%`;
            }
            else {
                let width_style = `width: calc(${100 / this.options.tabs.length}% - ${this.separateWidth * (this.options.tabs.length - 1) / this.options.tabs.length}px);`;
                if (index === 0) {
                    return width_style + `margin-right:${this.separateWidth * 1 / 2}px;`;
                }
                else if (index === this.options.tabs.length - 1) {
                    return width_style + `margin-left:${this.separateWidth * 1 / 2}px;`;
                }
                else {
                    return width_style + `margin: 0 ${this.separateWidth * 1 / 2}px;`;
                }
            }
        },
        computeHeight(height, minHeight) {
            this.heightGroup.push(height);
            this.minHeightGroup.push(minHeight);
            if (this.heightGroup.length === this.options.tabs.length) {
                this.$refs.tabs.forEach((tab, index) => {
                    tab.$refs.levelTwo.$el.style.height = `calc(100% - ${Math.max(...this.heightGroup)}px)`;
                    tab.$refs.levelTwo.$el.style['min-height'] = `${Math.max(...this.minHeightGroup)}px`;
                    tab.$refs.levelTwo.$refs.levelTwoContent.style['bottom'] = '0px';
                    tab.$refs.levelTwo.$refs.levelTwoContent.style['position'] = 'absolute';
                });
                if (!this.columns) {
                    this.$nextTick(() => {
                        this.$refs.tabContent.forEach(item => {
                            item.style['min-height'] = this.$refs.totalHeight.offsetHeight + 'px';
                        });
                    });
                }
            }
        },
        handleInnerEmit(val) {
            this.$emit('innerEmit', val);
        }
    },
};
</script>

<style lang="less">
.key-index-body {
    width: 100%;
    .body-content {
        height: 100%;
        width: 100%;
        .tab {
            box-sizing: border-box;
            display: inline-block;
            vertical-align: top;
            height: 100%;
        }
        .column-tab-line {
            margin-top: 30px;
        }
    }
}
.default-key-index-body {
    .body-content {
        .tab {
            border-left: 1px solid rgba(30, 35, 48, 0.06);
            &:first-child {
                border-left: none;
            }
        }
    }
    .main-part {
        .tab:first-child {
            position: relative;
            &:after {
                content: '';
                margin-top: -6px;
                position: absolute;
                top: 50%;
                right: -8px;
                width: 12px;
                height: 12px;
                background: #FFFFFF;
                border-right: 1px solid rgba(30,35,48,0.06);
                border-top: 1px solid rgba(30,35,48,0.06);
                transform: rotate(45deg);
                -ms-transform: rotate(45deg);
                -moz-transform: rotate(45deg);
                -webkit-transform: rotate(45deg);
                -o-transform: rotate(45deg);
            }
        }
    }
}
.separate-key-index-body {
    .tab {
        box-shadow: 2px 4px 10px 0 rgba(30, 35, 48, 0.08);
        border-radius: 6px;
        border: solid 1px #E1E6F0;
        padding-top: 24px;
        padding-bottom: 24px;
        box-sizing: border-box;
    }
}
</style>
