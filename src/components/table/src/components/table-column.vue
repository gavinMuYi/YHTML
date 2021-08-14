<template>
    <div class="y-table-column y-td" :style="columnStyle">
        <y-cell :label="label" v-if="position === 'YTableHeader'"></y-cell>
        <div v-else-if="position === 'YTableRow'" @click="context.extend"
             :style="firstColumnStyle(context.level, index)">
            <y-icon v-if="context.loading && !index && index !== null" name="loading" class="loading" />
            <y-cell :highlight="highlight" :label="context.data && context.data[columnKey]">
            </y-cell>
        </div>
        <div v-else>
            <div>YTableColumn only can be used in YTable</div>
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
    mounted() {
        console.log(this.$parent.YComponentName);
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
}
</style>