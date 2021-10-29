<template>
    <div class="y-popmenu">
        <y-popper ref="pop" :clazz="`y-popmenu ${clazz}`" :placement="placement" :priority="priority">
            <div v-if="!options.length" class="no-data">暂无数据</div>
            <div v-else>
                <div v-for="(item, index) in options" :key="item[_maps.key] + '-' + index"
                     :class="['y-popmenu_item', {'disable': item[_maps.disable]},
                              {'selected': showSelect && currentSelect === item[_maps.key]}]"
                     @click="select(item)">
                    <y-cell :label="String(item[_maps.label])" :highlight="highlight"
                            :highlightCaseConvert="highlightCaseConvert"
                            :highlightColor="highlightColor" />
                </div>
            </div>
        </y-popper>
    </div>
</template>

<script>
import YPopper from '@/components/popper';
import YCell from '@/components/cell';

export default {
    name: 'YPopmenu',
    components: {
        YPopper,
        YCell
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
        },
        selected: {
            type: String,
            default: null
        },
        options: {
            type: Array,
            default: () => {
                return [];
            }
        },
        maps: {
            type: Object,
            default: () => {
                return {
                    key: 'key',
                    label: 'label',
                    disable: 'disable'
                };
            }
        },
        highlight: {
            type: String,
            default: ''
        },
        // 高亮文本是否模糊匹配大小写
        highlightCaseConvert: {
            type: Boolean,
            default: false
        },
        highlightColor: {
            type: String,
            default: '#00cc26'
        },
        showSelect: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            currentSelect: this.selected
        };
    },
    computed: {
        _maps() {
            return {
                ...this.maps,
                key: 'key',
                label: 'label',
                disable: 'disable'
            };
        }
    },
    watch: {
        selected(nval) {
            this.currentSelect = nval;
        }
    },
    methods: {
        select(item) {
            this.currentSelect = item[this._maps.key];
            this.$refs.pop.closePop();
            this.$emit('change', item);
        }
    }
};
</script>

<style lang="less">
    .y-popmenu {
        padding: 5px 0!important;
        .y-popmenu_item {
            min-width: 30px;
            max-width: 200px;
            display: flex;
            align-items: center;
            height: 26px;
            padding: 0 10px;
            &:hover {
                background: @backgroundGreenHover;
                cursor: pointer;
            }
        }
        .disable {
            pointer-events: none;
            opacity: 0.7;
        }
        .selected {
            background: @backgroundGreen;
            &:hover {
                background: @backgroundGreen;
                cursor: pointer;
            }
        }
        .no-data {
            width: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0.7;
            font-size: 14px;
        }
    }
</style>
