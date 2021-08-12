<template>
    <div class="y-table">
        <YTree :options="options" :lazyLoad="lazyLoad" :multiple="multiple" :track="false">
            <div slot="line" slot-scope="props">
                <div v-if="!props.level" class="y-th">
                    <div v-for="(column, index) in columnConfig" :key="column.key + '-thtd' + index" class="y-td"
                         :style="columnStyle(column)">
                        {{ column.label }}
                    </div>
                </div>
                <div v-else class="y-tr" @click="props.extend">
                    <div v-for="(column, index) in columnConfig" :key="column.key + index" class="y-td"
                         :style="columnStyle(column)">
                        <y-cell :highlight="highlight" :label="props.data && props.data[column.key]"
                                :style="firstColumnStyle(props.level, index)">
                        </y-cell>
                    </div>
                </div>
            </div>
        </YTree>
    </div>
</template>

<script>
import YTree from '@/components/tree';
import YCell from '@/components/cell';

export default {
    name: 'YTable',
    components: {
        YTree,
        YCell
    },
    props: {
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
        multiple: {
            type: Boolean,
            default: false
        },
        columnConfig: {
            type: Array,
            default: () => {
                return [];
            }
        },
        highlight: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
        };
    },
    methods: {
        columnStyle(column) {
            if (column.width) {
                return {
                    width: column.width,
                    flex: 'none'
                };
            } else {
                return {};
            }
        },
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
    .y-table {
        .y-th,
        .y-tr {
            display: flex;
            align-items: center;
            .y-td {
                flex: 1;
                overflow: hidden;
                .y-cell {
                    max-width: 100%;
                    overflow: hidden;
                    box-sizing: border-box;
                    padding-left: 10px;
                }
            }
        }
        .y-th {
            background: #c4efec;
            height: 60px;
            .y-td {
                max-width: 100%;
                overflow: hidden;
                box-sizing: border-box;
                padding-left: 10px;
                text-overflow: ellipsis;
                white-space:nowrap;
            }
        }
        .y-tr {
            border-bottom: 1px solid #c4efec;
            height: 50px;
        }
    }
</style>
