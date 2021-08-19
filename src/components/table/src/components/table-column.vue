<template>
    <td :class="[
            'y-table-column y-td',
            {'header-y-td-border': position === 'YTableHeader' && headerBorder},
            {'header-y-td': position === 'YTableHeader'},
            {'with-level-header': position === 'YTableHeader' && !columnKey}
        ]"
        :style="columnStyle">
        <div v-if="position === 'YTableHeader'" class="header-cell">
            <slot name="header" :data="context">
                <y-cell :label="label">
                </y-cell>
            </slot>
        </div>
        <template v-else-if="position === 'YTableRow'">
            <slot :data="context" :columnIndex="index.columnIndex">
                <div @click="context.extend"
                     v-if="columnKey"
                     :style="firstColumnStyle(context.level, index.columnIndex)">
                    <y-icon v-if="context.loading && !index.columnIndex" name="loading" class="loading" />
                    <div v-if="multiple && !index.columnIndex"
                         @click.stop="context.multipleSelect" class="multiple-checkbox">
                        <y-checkbox :status="context.tracked" />
                    </div>
                    <y-cell :highlight="highlight" :label="context.data && context.data[columnKey]">
                    </y-cell>
                </div>
            </slot>
        </template>
        <div v-if="position === 'YTableHeader' && !columnKey"
             :class="['level-header', {'level-header-border': headerBorder}]">
            <slot :data="context">
                <y-cell :label="label"></y-cell>
            </slot>
        </div>
    </td>
</template>

<script>
import YCheckbox from '@/components/checkbox';
import YCell from '@/components/cell';
import YIcon from '@/components/icon';

export default {
    name: 'YTableColumn',
    components: {
        YCell,
        YIcon,
        YCheckbox
    },
    props: {
        label: {
            type: String,
            default: ''
        },
        columnKey: {
            type: String,
            default: ''
        },
        highlight: {
            type: String,
            default: ''
        },
        width: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            context: {},
            multiple: false
        };
    },
    computed: {
        index() {
            let child = this;
            let parent = this.$parent;
            let groupIndex = null;
            let columnIndex = 0;
            let columnIndexAdd = (parent, loopable) => {
                parent.$children.forEach((vnode, index) => {
                    if (loopable && vnode._uid === child._uid) {
                        loopable = false;
                    } else {
                        columnIndex += parent.$children[index].$children.length;
                    }
                });
                return loopable;
            };
            while (parent && !parent.YComponentName
                && ['YTableHeader', 'YTableRow'].indexOf(parent.YComponentName) === -1) {
                let loopable = true;
                loopable = columnIndexAdd(parent, loopable);
                child = parent;
                parent = parent.$parent;
            }
            parent.$children.forEach((vnode, index) => {
                if (vnode._uid === child._uid) {
                    groupIndex = index;
                    columnIndex += index;
                }
            });
            return {
                groupIndex,
                columnIndex
            };
        },
        position() {
            let parent = this.$parent;
            while (parent && !parent.YComponentName
                && ['YTableHeader', 'YTableRow'].indexOf(parent.YComponentName) === -1) {
                parent = parent.$parent;
            }
            parent && this.$set(this, 'context', parent.context);
            parent && this.$set(this, 'multiple', parent.multiple);
            return parent && parent.YComponentName;
        },
        headerBorder() {
            return (this.position === 'YTableHeader' && this.$slots.default && this.$slots.default.length)
                || (this.$parent.getHeaderBorder && this.$parent.getHeaderBorder());
        },
        columnStyle() {
            if (!this.columnKey) {
                let res = {
                    flex: 'none'
                };
                this.width && (res.width = this.width);
                if (this.position !== 'YTableHeader') {
                    res.display = 'flex';
                }
                return res;
            }
            if (this.width) {
                return {
                    width: this.width,
                    flex: 'none'
                };
            } else {
                return {};
            }
        }
    },
    methods: {
        firstColumnStyle(level, index) {
            let indentation = level > 1 && !index ? {
                'padding-left': (level * 20) + 'px',
                display: 'flex',
                height: '100%',
                'align-items': 'center'
            } : {
                display: 'flex',
                height: '100%',
                'align-items': 'center'
            };
            return indentation;
        },
        getHeaderBorder() {
            return this.headerBorder;
        }
    }
};
</script>

<style lang="less">
.header-y-td {
    .header-cell {
        position:relative;
        top:50%;
        -webkit-transform:translateY(-50%);
    }
}
.with-level-header {
    & > .header-cell {
        position: static;
        -webkit-transform:translateY(0%);
    }
}
.y-table-column {
    .multiple-checkbox {
        position: relative;
        top: 3px;
        left: 10px;
        margin-left: 10px;
    }
    .y-cell {
        max-width: 100%;
        overflow: hidden;
        box-sizing: border-box;
        padding: 0 20px;
        width: 100%;
        text-align: left;
    }
    .loading {
        position: absolute;
        top: 50%;
        margin-top: -8px;
        left: 2px;
        width: 16px;
        height: 16px;
        fill: #18b9ac;
    }
    .level-header {
        display: flex;
    }
    .level-header-border {
        border-top: 1px solid #f0fffd;
    }
}
.header-y-td-border {
    position: relative;
    &:before {
        position: absolute;
        content: '';
        height: 100%;
        border-left: 1px solid #f0fffd;

    }
}
</style>
