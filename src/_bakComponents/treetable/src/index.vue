<template>
    <div class="y-tree-table">
        <div class="y-tree-table-content">
            <y-tree :lazyLoad="fetchFunc" :multiple="multiple" :track="false" :count="count"
                    :highlight="highlight" @loaded="loaded" ref="tableTree" @change="multipleSelect">
                <div slot="line" slot-scope="props">
                    <y-tree-table-header :context="props" v-if="!props.level">
                        <slot>
                            <y-tree-table-column v-for="(column, index) in columnConfig"
                                                 :key="column.key + '-thtd' + index"
                                                 :columnKey="column.key"
                                                 :width="column.width" :label="column.label">
                            </y-tree-table-column>
                        </slot>
                    </y-tree-table-header>
                    <y-tree-table-row :context="props" @rowClick="rowClick" :multiple="multiple" v-else>
                        <slot :name="`table-row-${props.level}`" :data="props" :extend="props.extend">
                            <slot>
                                <y-tree-table-column v-for="(column, index) in columnConfig" :key="column.key + index"
                                                     :highlight="highlight" :columnKey="column.key"
                                                     :width="column.width" />
                            </slot>
                        </slot>
                    </y-tree-table-row>
                </div>
                <div
                    slot="loadmore"
                    slot-scope="props"
                    v-show="props.extendStatus">
                    <div v-if="(props.level || scrollTable) && props.loadMore && props.dataList.length"
                         @click="props.loadMoreFetch" class="load-more"
                         :style="`padding-left: ${20 * (props.level + 2)}px`">
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
import YTreeTableColumn from './components/table-column';
import YTreeTableHeader from './components/table-header';
import YTreeTableRow from './components/table-row';

export default {
    name: 'YTable',
    components: {
        YTree,
        YIcon,
        YPagination,
        YTreeTableHeader,
        YTreeTableRow,
        YTreeTableColumn
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
        },
        contentMaxHeight: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            index: 1,
            fetchFunc: this.initLoad(),
            total: 0
        };
    },
    mounted() {
        this.contentMaxHeight && this.setMaxHeight();
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
        },
        multipleSelect(val) {
            if (this.multiple) {
                this.$emit('multipleSelect', val);
            }
        },
        setMaxHeight() {
            let childrenContent = this.$refs.tableTree.$refs.childrenContent;
            childrenContent.style.maxHeight = `${this.contentMaxHeight}px`;
            childrenContent.style.overflow = 'auto';
        }
    }
};
</script>

<style lang="less">
    .y-tree-table {
        .y-tree-table-content {
            overflow: auto;
            >.y-tree {
                float: left;
                min-width: ~'calc(100% - 1px)';
            }
            .y-th,
            .y-tr {
                display: flex;
                align-items: stretch;
                .y-td {
                    flex: 1;
                    overflow: hidden;
                    position: relative;
                }
            }
            .y-th {
                background: @greenGray;
                min-height: 60px;
            }
            .y-tr {
                border-bottom: 1px solid @gray;
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
