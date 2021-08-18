<template>
    <div class="y-table">
        <div class="y-table-content">
            <y-tree :lazyLoad="fetchFunc" :multiple="multiple" :track="false" :count="count"
                    :highlight="highlight" @loaded="loaded" ref="tableTree">
                <div slot="line" slot-scope="props">
                    <y-table-header :context="props" v-if="!props.level">
                        <slot>
                            <y-table-column v-for="(column, index) in columnConfig"
                                            :key="column.key + '-thtd' + index"
                                            :columnKey="column.key"
                                            :width="column.width" :label="column.label">
                            </y-table-column>
                        </slot>
                    </y-table-header>
                    <y-table-row :context="props" @rowClick="rowClick" :multiple="multiple" v-else>
                        <slot :name="`table-row-${props.level}`" :data="props" :extend="props.extend">
                            <slot>
                                <y-table-column v-for="(column, index) in columnConfig" :key="column.key + index"
                                                :highlight="highlight" :columnKey="column.key"
                                                :width="column.width" />
                            </slot>
                        </slot>
                    </y-table-row>
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
                </div>
            </y-tree>
        </div>
        <y-pagination
            v-if="!scrollTable && count > 0"
            :total="total" :index="index" :count="count"
            @change="hanlePagination"/>
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
            fetchFunc: this.initLoad(),
            total: 0
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
        },
        loaded(total, level) {
            this.total = total;
        },
        hanlePagination(val) {
            this.$refs.tableTree.loadFunction && this.$refs.tableTree.loadFunction(false, {
                count: val.count, index: val.index, highlight: this.highlight
            });
        },
        rowClick(val) {
            this.$emit('rowClick', val);
        }
    }
};
</script>

<style lang="less">
    .y-table {
        .y-table-content {
            overflow: auto;
            >.y-tree {
                float: left;
                min-width: ~'calc(100% - 1px)';
            }
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
                background: #dbf4f0;
                min-height: 60px;
            }
            .y-tr {
                border-bottom: 1px solid #e3f0ef;
                min-height: 50px;
            }
            .table-load {
                position: absolute;
            }
        }
        .y-pagination {
            margin-top: 20px;
        }
    }
</style>
