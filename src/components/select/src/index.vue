<template>
    <div class="y-select">
        <span v-ypop:ySelectPop.click class="trigger-binder">
            <slot name="trigger">
                <div class="y-select-trigger">
                    <y-cell :label="placeholder" />
                </div>
            </slot>
        </span>
        <y-popper
            ref="ySelectPop"
            :clazz="`y-select-pop ${cascadeMode ? 'y-select-pop-cascade' : 'y-select-pop-common'}`"
            :placement="placement">
            <div class="y-select-pop_tree"
                 @click.stop="() => {}">
                <y-tree
                    :fatherDisableStatue="fatherDisableStatue"
                    :cascadeBottom="cascadeBottom"
                    :cascadeMode="cascadeMode"
                    :accordion="accordion"
                    :beforeCascadeLevel="beforeCascadeLevel"
                    :fatherID="fatherID"
                    :treeSize="treeSize"
                    :cascadeLevel="cascadeLevel"
                    :value="value"
                    :tracklessData="tracklessData"
                    :options="options"
                    :lazyLoad="lazyLoad"
                    :level="level"
                    :self="self"
                    :maps="maps"
                    :count="count"
                    :highlight="highlight"
                    :multiple="multiple"
                    :track="track"
                    :selected="selected"
                    :fatherStatus="fatherStatus"
                    @change="handleChange" />
            </div>
        </y-popper>
    </div>
</template>

<script>
import YPopper from '@/components/popper';
import YCell from '@/components/cell';
import YTree from '@/components/tree';
export default {
    name: 'YSelect',
    components: {
        YPopper,
        YCell,
        YTree
    },
    props: {
        placement: {
            type: String,
            default: 'bottom-start'
        },
        placeholder: {
            type: String,
            default: '请选择'
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
        highlight: {
            type: String,
            default: ''
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
        };
    },
    methods: {
        handleChange(val) {
            console.log(val);
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
            }
        }
    }
    .y-select-pop {
        margin-top: 2px;
        .y-select-pop_tree {
            border: 1px solid  @commonGray;
            font-size: 0px;
        }
    }
    .y-select-pop-common {
        width: 300px;
        .y-select-pop_tree {
            overflow: auto;
            max-height: 400px;
        }
    }
</style>
