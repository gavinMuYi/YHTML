<template>
    <div class="y-table">
        <YTree :options="options" :lazyLoad="lazyLoad" :track="false">
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
                        <y-cell :highlight="highlight" :label="props.data && props.data[column.key]"></y-cell>
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
            }
        }
        .y-th {
            background: #c4efec;
            height: 60px;
        }
        .y-tr {
            border-bottom: 1px solid #c4efec;
            height: 50px;
        }
    }
</style>
