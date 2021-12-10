<template>
    <div class="y-select">
        <span v-ypop:ySelectPop.click class="trigger-binder">
            <slot name="trigger" :triggerTexts="triggerTexts">
                <div :class="['y-select-trigger', {'y-select-trigger_muti': multiple && triggerTexts.length > 1}]">
                    <y-cell :label="currentAsyncSelectAll ? '全部选项' : (triggerTexts[0] || placeholder)" />
                    <div class="trigger-num" v-if="!currentAsyncSelectAll && multiple && triggerTexts.length > 1">
                        等 {{ triggerTexts.length }} 项
                    </div>
                    <y-icon name="arrow-down" class="trigger-arrow" />
                </div>
            </slot>
        </span>
        <y-popper
            ref="ySelectPop"
            :clazz="`y-select-pop ${cascadeMode ? 'y-select-pop-cascade' : 'y-select-pop-common'} ${cascadeRelative
            ? 'y-select-cascade-relative-pop' : ''}`"
            :placement="placement" @click.native="handleSelectTreeClick">
            <div class="y-select-pop_search-bar" v-if="searchPlaceholder" @click.stop="() => {}"
                 :style="cascadeRelativeSearchStyle">
                <y-input size="min" class="y-select_input" leftIcon="search" quickClear @change="handleSearch"
                         :placeholder="searchPlaceholder" />
            </div>
            <div :class="['y-select-pop_tree', {'y-select-pop_tree-border': cascadeMode},
                          {'y-tree_selectall': asyncSelectAll}]"
                 @click.stop="handleSelectTreeClick">
                <div class="tree-loading" v-if="!options && loading">
                    <y-icon name="loading" />
                </div>
                <div class="async-data-muti-tip" v-if="asyncSelectAll">
                    异步数据全选暂不支持逐个取消
                </div>
                <y-tree
                    ref="tree"
                    withBorder
                    :key="highlight"
                    :accordion="accordion"
                    :cascadeBottom="cascadeBottom"
                    :cascadeMode="cascadeMode"
                    :treeSize="treeSize || (cascadeMode ? [300, 400] : null)"
                    :value="tempValue"
                    :options="options"
                    :lazyLoad="lazyLoad"
                    :maps="maps"
                    :count="count"
                    :highlight="highlight"
                    :highlightFilter="highlightFilter"
                    :multiple="multiple"
                    :track="track"
                    @change="handleChange"
                    @loaded="handleLoaded">
                    <template slot="item" slot-scope="props">
                        <slot name="item" :data="props.data" :level="props.level">
                            <y-cell :highlight="highlight" :label="props.data[_maps.label]"></y-cell>
                        </slot>
                    </template>
                </y-tree>
            </div>
            <div class="y-select-pop_action-bar" @click.stop="() => {}" :style="cascadeRelativeBarStyle">
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
            default: ''
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
        accordion: {
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
        cascadeRelative: {
            type: Boolean,
            default: false
        },
        treeSize: {
            type: Array,
            default: null
        },
        value: {
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
        },
        cascadeRelativeSearchStyle() {
            if (this.cascadeRelative) {
                return {
                    width: `${this.treeSize ? (this.treeSize[0] || 300) : 300}px`,
                    height: '50px',
                    display: 'inline-block',
                    background: '#ffffff',
                    padding: '10px 10px',
                    marginBottom: '0',
                    boxSizing: 'border-box',
                    borderRadius: '3px 3px 0px 0px',
                    border: '1px solid #e3f0ef',
                    borderBottom: 'none',
                    boxShadow: '2px 4px 10px 0 rgba(30, 35, 48, 0.08)'
                };
            } else {
                return [];
            }
        },
        cascadeRelativeBarStyle() {
            if (this.cascadeRelative) {
                return {
                    width: `${this.treeSize ? (this.treeSize[0] || 300) : 300}px`,
                    height: '50px',
                    position: 'absolute',
                    right: 0,
                    background: '#ffffff',
                    marginTop: '0px',
                    padding: '10px 10px',
                    boxSizing: 'border-box',
                    borderRadius: '0px 0px 3px 3px',
                    border: '1px solid #e3f0ef',
                    borderTop: 'none',
                    boxShadow: '2px 4px 10px 0 rgba(30, 35, 48, 0.08)'
                };
            } else {
                return [];
            }
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
        },
        handleSelectTreeClick() {
            if (this.cascadeRelative) {
                this.$refs.ySelectPop.closePop();
            }
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
                position: relative;
                .y-cell {
                    width: 100%;
                }
                .trigger-arrow {
                    position: absolute;
                    right: 10px;
                    top: 8px;
                    width: 12px;
                    height: 12px;
                }
            }
            .y-select-trigger_muti {
                position: relative;
                .y-cell {
                    width: ~'calc(100% - 70px)';
                }
                .trigger-num {
                    position: absolute;
                    right: 30px;
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
        .y-select-pop_tree-border {
            border: none;
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
    .y-select-cascade-relative-pop {
        padding: 0!important;
        background: #ffffff00!important;
        border: none!important;
        box-shadow: none!important;
        margin-top: 4px!important;
        .y-select-pop_tree {
            border: none!important;
            .y-tree-children_group {
                background: #ffffff;
                border-radius: 3px;
                box-shadow: 2px 4px 10px 0 rgba(30, 35, 48, 0.08);
            }
        }
    }
</style>
