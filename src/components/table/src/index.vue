<template>
    <div class="y-table">
        <y-tree :lazyLoad="fetchFunc" :multiple="multiple" :track="false" :count="count"
                :highlight="highlight">
            <div slot="line" slot-scope="props">
                <div v-if="!props.level" class="y-th">
                    <y-table-header :context="props">
                        <slot>
                            <y-table-column v-for="(column, index) in columnConfig"
                                            :key="column.key + '-thtd' + index"
                                            :width="column.width" :label="column.label">
                            </y-table-column>
                        </slot>
                    </y-table-header>
                </div>
                <div v-else class="y-tr">
                    <slot :name="`table-row-${props.level}`" :data="props.data" :extend="props.extend">
                        <y-table-row :context="props">
                            <slot>
                                <y-table-column v-for="(column, index) in columnConfig" :key="column.key + index"
                                                :index="index" :highlight="highlight" :columnKey="column.key"
                                                :width="column.width" />
                            </slot>
                        </y-table-row>
                    </slot>
                </div>
            </div>
            <div
                slot="loadmore"
                slot-scope="props"
                v-show="props.extendStatus">
                <div v-if="(props.level || scrollTable) && props.loadMore && props.dataList.length"
                     @click="props.loadMoreFetch" class="load-more"
                     :style="`padding-left: ${20 * (props.level + 1)}px`">
                    <span v-if="props.loading" class="loading"><y-icon name="loading" />加载中...</span>
                    <span v-else>加载更多...</span>
                </div>
                <div v-else v-show="!scrollTable && !props.level">
                    <y-pagination
                        v-if="props.count > 0"
                        :total="props.total" :index="index" :count="props.count"
                        @change="val => {
                            props.loadFunction && props.loadFunction(false, {
                                count: val.count, index: val.index, highlight: highlight
                            });
                    }"/>
                </div>
            </div>
        </y-tree>
    </div>
</template>

<script>
import YTree from '@/components/tree';
import YIcon from '@/components/icon';
import YPagination from '@/components/pagination';
import YTableColumn from './components/table-column';
import YTableHeader from './components/table-header';
import YTableRow from './components/table-row';

export default {
    name: 'YTable',
    components: {
        YTree,
        YIcon,
        YPagination,
        YTableHeader,
        YTableRow,
        YTableColumn
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
        count: {
            type: Number,
            default: -1
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
        },
        scrollTable: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            index: 1,
            fetchFunc: this.initLoad()
        };
    },
    methods: {
        initLoad() {
            return this.options
                ? (index, count) => {
                    return new Promise((resolve, reject) => {
                        resolve();
                    }).then(() => {
                        return {
                            options: this.count > -1
                                ? this.options.slice((index - 1) * count, index * count)
                                : this.options,
                            total: this.options.length
                        };
                    });
                } : this.lazyLoad;
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
                position: relative;
            }
        }
        .y-th {
            background: #e3f0ef;
            height: 60px;
        }
        .y-tr {
            border-bottom: 1px solid #e3f0ef;
            height: 50px;
        }
        .y-pagination {
            margin-top: 20px;
        }
    }
</style>
