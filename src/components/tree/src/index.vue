<template>
    <div class="y-tree">
        <slot name="line"
              :data="self" :level="level" :loading="loading"
              :isSelected="isSelected" :isFolder="isFolder"
              :extendStatus="extendStatus" :tracked="tracked"
              :extend="extend" :multipleSelect="multipleSelect">
            <div
                v-if="self" @click="extend"
                :class="[
                    'list-item',
                    `level${level}`,
                    {'is-selected': isSelected}
                ]"
                :style="`padding-left: ${15 * (level - 1) + 8}px`">
                <y-icon :name="loading ? 'loading' : `arrow-${extendStatus ? 'up' : 'down'}`"
                        :class="['arrow', {'loading': loading}]" v-if="isFolder"/>
                <span v-else class="no-arrow"></span>
                <span class="label-item">
                    <span v-if="multiple" @click.stop="multipleSelect"><YCheckbox :status="tracked" /></span>
                    <slot name="item" :data="self" :level="level">
                        <y-cell :highlight="highlight" :label="self[maps.label]"></y-cell>
                    </slot>
                </span>
            </div>
        </slot>
        <y-tree
            v-show="extendStatus"
            v-for="(child, cIndex) in dataList" :key="child[maps.key] + cIndex + '-' + level"
            :options="child[maps.children]"
            :lazyLoad="lazyLoad"
            :level="level + 1"
            :self="child"
            :maps="maps"
            :track="track"
            :count="count"
            :multiple="multiple"
            :fatherStatus="tracked"
            :tracklessData="trackLessSelect.concat(tracklessData)"
            :selected="checkTrack(child[maps.key])"
            @childSelect="handleChildSelect">
            <template slot="line" slot-scope="props">
                <slot name="line"
                      :data="props.data" :level="props.level" :loading="props.loading"
                      :isSelected="props.isSelected" :isFolder="props.isFolder"
                      :extendStatus="props.extendStatus" :tracked="props.tracked"
                      :extend="props.extend" :multipleSelect="props.multipleSelect">
                    <template slot="item" slot-scope="props">
                        <slot name="item" :data="props.data" :level="props.level">
                            <y-cell :highlight="highlight" :label="props.data[maps.label]"></y-cell>
                        </slot>
                    </template>
                </slot>
            </template>
            <template slot="nodata">
                <slot name="nodata"><div>暂无数据</div></slot>
            </template>
            <template slot="loadmore" slot-scope="props">
                <slot name="loadmore"
                      :index="props.index" :count="props.count"
                      :extendStatus="props.extendStatus" :loading="props.loading" :total="props.total"
                      :loadMore="props.loadMore" :dataList="props.dataList" :level="props.level"
                      :loadMoreFetch="props.loadMoreFetch">
                    <div
                        v-show="props.extendStatus"
                        v-if="props.loadMore && props.dataList.length"
                        class="load-more"
                        :style="`padding-left: ${15 * props.level + 25}px`"
                        @click="props.loadMoreFetch">
                        <span v-if="props.loading" class="loading"><y-icon name="loading" />加载中...</span>
                        <span v-else>加载更多...</span>
                    </div>
                </slot>
            </template>
        </y-tree>
        <slot name="loadmore"
              :index="index" :count="count"
              :extendStatus="extendStatus" :loading="loading" :total="total"
              :loadMore="loadMore" :dataList="dataList" :level="level"
              :loadMoreFetch="loadMoreFetch" :loadFunction="loadFunction">
            <div
                v-show="extendStatus"
                v-if="loadMore && dataList.length"
                class="load-more"
                :style="`padding-left: ${15 * level + 25}px`"
                @click="loadMoreFetch">
                <span v-if="loading" class="loading"><y-icon name="loading" />加载中...</span>
                <span v-else>加载更多...</span>
            </div>
        </slot>
        <div v-if="!level && !dataList.length && !loading">
            <slot name="nodata"><div class="no-data">暂无数据</div></slot>
        </div>
    </div>
</template>

<script>
import YCell from '@/components/cell';
import YIcon from '@/components/icon';
import YCheckbox from '@/components/checkbox';
import clone from 'clone';

export default {
    name: 'YTree',
    components: {
        YCell,
        YIcon,
        YCheckbox
    },
    props: {
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
                    extend: 'extend'
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
            treeSelect: this.track ? clone(this.value) : [],
            trackLessSelect: this.track ? [] : clone(this.value),
            index: 1,
            fetchFunc: this.initLoad(),
            dataList: [],
            showChildren: false,
            extendStatus: !this.level,
            currentHover: null,
            loadMore: true,
            loading: false,
            total: null
        };
    },
    computed: {
        isFolder() {
            if (!this.self) return true;
            return (this.self[this.maps.children]
                && this.self[this.maps.children].length)
                || this.self[this.maps.hasChildren];
        },
        tracked() {
            if (this.multiple) {
                if (this.fatherStatus === 'all') {
                    return 'all';
                }
                if (this.selected && this.selected[this.maps.key]) {
                    return this.selected.half ? 'half' : 'all';
                } else {
                    return 'empty';
                }
            }
            return this.selected && this.selected[this.maps.key] ? 'selected' : '';
        },
        isSelected() {
            if (!this.multiple) {
                return this.tracked && !this.isFolder;
            } else {
                return false;
            }
        }
    },
    watch: {
        extendStatus(val) {
            !this.dataList.length && val && this.loadFunction(false);
        },
        value: {
            handler: function(nval) {
                this.$set(this, 'treeSelect', this.track ? clone(nval) : []);
                this.$set(this, 'trackLessSelect', this.track ? [] : clone(nval));
            },
            deep: true
        },
        count() {
            this.init();
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.index = 1;
            if (this.self && this.self.extend) {
                this.extend();
            }
            !this.level && this.loadFunction(false);
            if (this.options && this.level) {
                // 同步加载
                !this.dataList.length && this.loadFunction(false);
            }
            if (this.tracklessData.length && this.self) {
                let reshow = this.tracklessData.filter(item => {
                    return item[this.maps.key] === this.self[this.maps.key];
                })[0];
                if (reshow && this.multiple) {
                    if (!this.isFolder) {
                        this.$emit('childSelect', this.self, true);
                    } else {
                        let selected = clone(this.self);
                        delete selected[this.maps.children];
                        delete selected[this.maps.hasChildren];
                        this.$emit('childSelect', selected, true);
                    }
                }
            }
        },
        initLoad() {
            return this.options
                ? () => {
                    return new Promise((resolve, reject) => {
                        resolve();
                    }).then(() => {
                        return {
                            options: this.options,
                            total: this.options.length
                        };
                    });
                } : this.lazyLoad;
        },
        loadFunction(concat, params) {
            this.loading = true;
            let { index, count, highlight, self } = params || {
                index: this.index,
                count: this.count,
                highlight: this.highlight,
                self: this.self
            };
            this.fetchFunc(index, count, highlight, self)
                .then(data => {
                    if (data.total === undefined) {
                        let options = clone(data);
                        data = {};
                        data.options = options;
                        data.total = null;
                    }
                    if (concat) {
                        this.$set(this, 'dataList', this.dataList.concat(data.options));
                    } else {
                        this.total = data.total;
                        this.$set(this, 'dataList', clone(data.options));
                    }
                    if (data.options.length < this.count || this.count === -1 || this.options) {
                        this.loadMore = false;
                    } else {
                        this.loadMore = true;
                    }
                    this.loading = false;
                });
        },
        extend() {
            this.isFolder && (this.extendStatus = !this.extendStatus);
            if (!this.multiple && !this.isFolder) {
                this.$emit('childSelect', this.self);
            }
            if (this.multiple && !this.isFolder) {
                this.$emit('childSelect', this.self, true);
            }
        },
        multipleSelect() {
            let selected = clone(this.self);
            delete selected[this.maps.children];
            delete selected[this.maps.hasChildren];
            this.$emit('childSelect', selected, true);
        },
        handleChildSelect(item, byhand) {
            if (!this.multiple) {
                let selected;
                if (this.level) {
                    selected = {
                        ...this.self,
                        children: [item]
                    };
                } else {
                    selected = item;
                }
                if (this.level) {
                    this.$emit('childSelect', selected);
                } else {
                    this.$set(this.treeSelect, 0, clone(selected));
                    this.$emit('change', this.formateData());
                }
            }
            else {
                let selected;
                let childClear = false;
                if (this.level) {
                    let selectedChildren = clone(this.selected[this.maps.children] || []);
                    if (this.tracked === 'all') {
                        selectedChildren = clone(this.dataList).map(item => {
                            delete item[this.maps.children];
                            delete item[this.maps.hasChildren];
                            return item;
                        });
                    }
                    let childIndex = -1;
                    let historyChildHalf = {};
                    selectedChildren.forEach((i, index) => {
                        if (i.half) {
                            historyChildHalf[index] = true;
                        }
                        i[this.maps.key] === item[this.maps.key] && (childIndex = index);
                    });
                    if (childIndex > -1) {
                        if (historyChildHalf[childIndex]) {
                            delete historyChildHalf[childIndex];
                        }
                        if (byhand) {
                            selectedChildren.splice(childIndex, 1);
                            !selectedChildren.length && (childClear = true);
                        } else {
                            selectedChildren.splice(childIndex, 1);
                            selectedChildren.push(item);
                            if (item.half) {
                                historyChildHalf['new'] = true;
                            }
                        }
                    } else {
                        selectedChildren.push(item);
                        if (item.half) {
                            historyChildHalf['new'] = true;
                        }
                    }
                    let half = Boolean(selectedChildren.length < this.dataList.length || this.loadMore
                        || Object.keys(historyChildHalf).length);
                    let selfSelected = clone(this.self);
                    delete selfSelected[this.maps.children];
                    delete selfSelected[this.maps.hasChildren];
                    selected = {
                        ...selfSelected,
                        half: half
                    };
                    if (half) {
                        selected.children = selectedChildren;
                    }
                } else {
                    selected = item;
                }
                if (this.level) {
                    if (childClear) {
                        this.$emit('childSelect', selected, true);
                    } else {
                        this.$emit('childSelect', selected);
                    }
                } else {
                    let selectedIndex = -1;
                    this.treeSelect.forEach((i, index) => {
                        i[this.maps.key] === item[this.maps.key] && (selectedIndex = index);
                    });
                    if (selectedIndex > -1) {
                        if (byhand) {
                            this.treeSelect.splice(selectedIndex, 1);
                        } else {
                            this.treeSelect.splice(selectedIndex, 1);
                            this.treeSelect.push(item);
                        }
                    } else {
                        this.treeSelect.push(item);
                    }
                    this.$emit('change', this.formateData());
                }
            }
        },
        loadMoreFetch() {
            this.index++;
            this.loadFunction(true);
        },
        checkTrack(key) {
            if (this.level) {
                return this.selected[this.maps.children] && this.selected[this.maps.children].filter(item => {
                    return item[this.maps.key] === key;
                })[0];
            } else {
                return this.treeSelect.filter(item => {
                    return item[this.maps.key] === key;
                })[0];
            }
        },
        formateData() {
            if (this.track) {
                return clone(this.treeSelect);
            } else {
                let flated = [];
                let flat = (arr) => {
                    arr.forEach(item => {
                        if (!item.half) {
                            flated.push(item);
                        } else {
                            flat(item[this.maps.children]);
                        }
                    });
                };
                flat(clone(this.treeSelect));
                return flated;
            }
        }
    }
};
</script>

<style lang="less">
    .y-tree {
        .list-item {
            width: 100%;
            box-sizing: border-box;
            height: 32px;
            position: relative;
            padding: 8px;
            line-height: 16px;
            display: flex;
            padding-right: 15px;
            .no-arrow {
                display: inline-block;
                width: 14px;
            }
            .folder-icon {
                width: 12px;
                height: 20px;
                margin-right: 5px;
            }
            .arrow {
                fill: #496866;
                width: 10px;
                height: 10px;
                margin-top: 3px;
                margin-right: 5px;
            }
            .loading {
                fill: #18b9ac;
                width: 14px;
                height: 14px;
                margin-top: 3px;
                margin-right: 5px;
            }
            &:hover {
                background: #e2fffd;
                cursor: pointer;
            }
        }
        .level1>.no-arrow {
            width: 10px;
        }
        .load-more {
            cursor: pointer;
            font-size: 14px;
            line-height: 32px;
            &:hover {
                color: #18b9ac;
            }
            span {
                color: #a8abb3;
            }
            .loading {
                color: #18b9ac;
                .y-icon {
                    fill: #18b9ac;
                    width: 14px;
                    height: 14px;
                    position: relative;
                    top: 2px;
                }
            }
        }
        .no-data {
            color: #a8abb3;
            font-size: 14px;
            line-height: 32px;
            text-align: center;
        }
        .is-selected {
            background: #b8f5f1;
            &:hover {
                background: #b8f5f1;
                cursor: pointer;
            }
        }
    }
</style>
