<template>
    <div class="y-select">
        <span v-ypop:ySelectPop.click class="trigger-binder">
            <slot name="trigger" :triggerTexts="triggerTexts">
                <div :class="['y-select-trigger', {'y-select-trigger_muti': multiple && triggerTexts.length > 1}]">
                    <y-cell :label="currentAsyncSelectAll ? '全部选项' : (triggerTexts[0] || placeholder)" />
                    <div class="trigger-num" v-if="!currentAsyncSelectAll && multiple && triggerTexts.length > 1">
                        等 {{ triggerTexts.length }} 项
                    </div>
                </div>
            </slot>
        </span>
        <y-popper
            ref="ySelectPop"
            :clazz="`y-select-pop ${cascadeMode ? 'y-select-pop-cascade' : 'y-select-pop-common'}`"
            :placement="placement">
            <div class="y-select-pop_search-bar" v-if="searchPlaceholder" @click.stop="() => {}">
                <y-input size="min" class="y-select_input" leftIcon="search" quickClear @change="handleSearch" />
            </div>
            <div :class="['y-select-pop_tree', {'y-tree_selectall': asyncSelectAll}]"
                 @click.stop="() => {}">
                <div class="tree-loading" v-if="!options && loading">
                    <y-icon name="loading" />
                </div>
                <div class="async-data-muti-tip" v-if="asyncSelectAll">
                    异步数据全选暂不支持逐个取消
                </div>
                <y-tree
                    ref="tree"
                    :key="highlight"
                    :fatherDisableStatue="fatherDisableStatue"
                    :cascadeBottom="cascadeBottom"
                    :cascadeMode="cascadeMode"
                    :accordion="accordion"
                    :beforeCascadeLevel="beforeCascadeLevel"
                    :fatherID="fatherID"
                    :treeSize="treeSize"
                    :cascadeLevel="cascadeLevel"
                    :value="tempValue"
                    :tracklessData="tracklessData"
                    :options="options"
                    :lazyLoad="lazyLoad"
                    :level="level"
                    :self="self"
                    :maps="maps"
                    :count="count"
                    :highlight="highlight"
                    :highlightFilter="highlightFilter"
                    :multiple="multiple"
                    :track="track"
                    :selected="selected"
                    :fatherStatus="fatherStatus"
                    @change="handleChange"
                    @loaded="handleLoaded">
                    <template slot="item" slot-scope="props">
                        <slot name="item" :data="props.data" :level="props.level">
                            <y-cell :highlight="highlight" :label="props.data[_maps.label]"></y-cell>
                        </slot>
                    </template>
                </y-tree>
            </div>
            <div class="y-select-pop_action-bar" @click.stop="() => {}">
                <div class="y-select-pop_tree_actions" v-if="multiple && quickSelectAll">
                    <span @click="selectAll">全选</span>
                    <span @click="clearAll">清空</span>
                </div>
                <div class="y-select-pop_btns">
                    <y-button size="min" status="primary" @click="confirm">确定</y-button>
                    <y-button size="min" @click="cancel">取消</y-button>
                </div>
            </div>
        </y-popper>
    </div>
</template>

<script>
import YButton from '@/components/button';
import YPopper from '@/components/popper';
import YInput from '@/components/input';
import YCell from '@/components/cell';
import YTree from '@/components/tree';
import YIcon from '@/components/icon';
import clone from 'clone';

export default {
    name: 'YSelect',
    components: {
        YButton,
        YPopper,
        YInput,
        YCell,
        YTree,
        YIcon
    },
    props: {
        searchPlaceholder: {
            type: String,
            default: '请搜索'
        },
        placement: {
            type: String,
            default: 'bottom-start'
        },
        placeholder: {
            type: String,
            default: '请选择'
        },
        quickSelectAll: {
            type: Boolean,
            default: false
        },
        allSelected: {
            type: Boolean,
            default: false
        },
        asyncSelectMode: {
            type: Boolean,
            default: true
        },
        // tree props
        fatherDisableStatue: {
            type: Boolean,
            default: false
        },
        cascadeBottom: {
            type: Number,
            default: 32
        },
        cascadeMode: {
            type: String,
            default: ''
        },
        accordion: {
            type: Boolean,
            default: false
        },
        beforeCascadeLevel: {
            type: Number,
            default: 0
        },
        fatherID: {
            type: String,
            default: null
        },
        treeSize: {
            type: Array,
            default: null
        },
        cascadeLevel: {
            type: Number,
            default: 0
        },
        value: {
            type: Array,
            default: () => {
                return [];
            }
        },
        tracklessData: {
            type: Array,
            default: () => {
                return [];
            }
        },
        options: {
            type: Array,
            default: null
        },
        lazyLoad: {
            type: Function,
            default: () => {
                return new Promise((resolve, reject) => {
                    resolve();
                }).then(() => {
                    return [];
                });
            }
        },
        level: {
            type: Number,
            default: 0
        },
        self: {
            type: Object,
            default: null
        },
        maps: {
            type: Object,
            default: () => {
                return {
                    key: 'key',
                    label: 'label',
                    children: 'children',
                    hasChildren: 'hasChildren',
                    disable: 'disable',
                    extend: 'extend',
                    cascade: 'cascade'
                };
            }
        },
        count: {
            type: Number,
            default: -1
        },
        highlightFilter: {
            type: Boolean,
            default: true
        },
        multiple: {
            type: Boolean,
            default: false
        },
        track: { // 还原整个用户选择轨迹
            type: Boolean,
            default: true
        },
        selected: {
            type: Object,
            default: () => {
                return {};
            }
        },
        fatherStatus: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            currentValue: clone(this.value),
            tempValue: clone(this.value),
            highlight: '',
            loading: true,
            asyncSelectAll: this.allSelected,
            currentAsyncSelectAll: this.allSelected
        };
    },
    computed: {
        _maps() {
            return {
                key: 'key',
                label: 'label',
                children: 'children',
                hasChildren: 'hasChildren',
                disable: 'disable',
                extend: 'extend',
                cascade: 'cascade',
                ...this.maps
            };
        },
        triggerTexts() {
            let labels = [];
            let _maps = {
                key: 'key',
                label: 'label',
                children: 'children',
                hasChildren: 'hasChildren',
                disable: 'disable',
                extend: 'extend',
                cascade: 'cascade',
                ...this.maps
            };
            let flatValue = function (arr) {
                arr.forEach(item => {
                    if (item[_maps.children]) {
                        flatValue(item[_maps.children]);
                    } else {
                        labels.push(item[_maps.label]);
                    }
                });
            };
            flatValue(this.currentValue);
            return labels;
        }
    },
    watch: {
        value(nval) {
            this.$set(this, 'tempValue', clone(nval));
            this.$set(this, 'currentValue', clone(nval));
        },
        highlight(nval) {
            this.loading = true;
        }
    },
    methods: {
        handleSearch(val) {
            this.highlight = val;
        },
        handleChange(val) {
            this.$set(this, 'tempValue', clone(val));
        },
        handleLoaded() {
            this.loading = false;
        },
        confirm() {
            this.$set(this, 'currentValue', clone(this.tempValue));
            this.$emit('confirm', this.asyncSelectAll ? 'all' : this.currentValue);
            this.currentAsyncSelectAll = this.asyncSelectAll;
            this.$refs.ySelectPop.closePop();
        },
        cancel() {
            this.$set(this, 'tempValue', clone(this.currentValue));
            this.$refs.ySelectPop.closePop();
        },
        selectAll() {
            if (this.options || !this.asyncSelectMode) {
                let leaves = this.$refs.tree.$refs.leaf;
                leaves && leaves.forEach(leaf => {
                    if (leaf.tracked !== 'all') {
                        leaf.multipleSelect();
                        if (leaf.tracked === 'half') {
                            leaf.multipleSelect();
                        }
                    }
                });
            } else {
                this.clearAll();
                this.asyncSelectAll = true;
            }
        },
        clearAll() {
            this.asyncSelectAll = false;
            this.$set(this, 'tempValue', []);
        }
    }
};
</script>

<style lang="less">
    .y-select {
        display: inline-block;
        .trigger-binder {
            display: inline-block;
            .y-select-trigger {
                display: inline-block;
                border: 1px solid  @commonGray;
                width: 200px;
                height: 30px;
                border-radius: 3px;
                box-sizing: border-box;
                padding: 4px 10px;
                .y-cell {
                    width: 100%;
                }
            }
            .y-select-trigger_muti {
                position: relative;
                .y-cell {
                    width: ~'calc(100% - 50px)';
                }
                .trigger-num {
                    position: absolute;
                    right: 10px;
                    top: 4px;
                    font-size: 14px;
                }
            }
        }
    }
    .y-select-pop {
        margin-top: 2px;
        .y-select-pop_tree {
            border: 1px solid  @commonGray;
            font-size: 0px;
            .tree-loading {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                .y-icon {
                    fill: @fontHighLight;
                    width: 24px;
                    height: 24px;
                }
            }
        }
        .y-tree_selectall {
            opacity: 0.5;
            pointer-events: none;
            position: relative;
            .async-data-muti-tip {
                position: absolute;
                top: 185px;
                font-size: 12px;
                display: inline-block;
                z-index: 1;
                background: @white;
                color: @fontHighLight;
                padding: 5px 20px;
                border-radius: 5px;
                left: 50%;
                margin-left: -105px;
            }
            .check-icon {
                background: @fontHighLight;
                .y-icon {
                    display: inline-block!important;
                }
            }
        }
        .y-select-pop_search-bar {
            height: 30px;
            margin-bottom: 10px;
            .y-select_input {
                width: 200px;
            }
        }
        .y-select-pop_action-bar {
            height: 30px;
            margin-top: 10px;
            .y-select-pop_tree_actions {
                float: left;
                span {
                    display: inline-block;
                    margin-right: 8px;
                    margin-top: 8px;
                    font-size: 12px;
                    cursor: pointer;
                    &:hover {
                        color: @fontHighLight;
                    }
                }
            }
            .y-select-pop_btns {
                float: right;
            }
        }
    }
    .y-select-pop-common {
        width: 300px;
        .y-select-pop_tree {
            overflow: auto;
            height: 400px;
        }
    }
</style>
