<template>
    <div :class="['y-table-column y-td', {'header-y-td-border': position === 'YTableHeader' && headerBorder}]"
         :style="columnStyle">
        <template v-if="position === 'YTableHeader'">
            <slot name="header" :data="context">
                <y-cell :label="label">
                </y-cell>
            </slot>
        </template>
        <template v-else-if="position === 'YTableRow'">
            <slot :data="context">
                <div @click="context.extend"
                     v-if="columnKey"
                     :style="firstColumnStyle(context.level, index)">
                    <y-icon v-if="context.loading && !index && index !== null" name="loading" class="loading" />
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
    </div>
</template>

<script>
import YCell from '@/components/cell';
import YIcon from '@/components/icon';

export default {
    name: 'YTableColumn',
    components: {
        YCell,
        YIcon
    },
    props: {
        headerBorder: {
            type: Boolean,
            default: false
        },
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
        index: {
            type: Number,
            default: null
        },
        width: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            context: {}
        };
    },
    computed: {
        position() {
            let parent = this.$parent;
            while (parent && !parent.YComponentName
                && ['YTableHeader', 'YTableRow'].indexOf(parent.YComponentName) === -1) {
                parent = parent.$parent;
            }
            parent && this.$set(this, 'context', parent.context);
            return parent && parent.YComponentName;
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
                'padding-left': (level * 20) + 'px'
            } : {};
            return indentation;
        }
    }
};
</script>

<style lang="less">
.y-table-column {
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
        top: 5px;
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