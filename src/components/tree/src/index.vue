<template>
    <div class="y-tree">
        <div
            v-if="self" @click="extend"
            :class="[
                'list-item',
                `level${level}`,
                {'is-selected': isSelected}
            ]"
            :style="`padding-left: ${15 * (level - 1) + 8}px`">
            <span
                :class="`arrow is-${extendStatus ? 'open' : 'close'}`"
                v-if="isFolder">
                {{ `is-${extendStatus ? 'open' : 'close'}` }}
            </span>
            <span v-else class="no-switch"></span>
            <span class="label-item">
                <span v-if="multiple" @click.stop="multipleSelect">{{ tracked }}</span>
                <y-cell :highlight="highlight" :label="self[maps.label]"></y-cell>
            </span>
        </div>
        <y-tree
            v-show="extendStatus"
            v-for="child in dataList" :key="child[maps.key]"
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
            @childSelect="handleChildSelect" />
        <div
            v-show="extendStatus"
            v-if="loadMore && dataList.length"
            class="load-more"
            :style="`padding-left: ${15 * level + 40}px`"
            @click="loadMoreFetch">
            加载更多...
        </div>
        <div v-if="!level && !dataList.length && !loading" class="no-data">
            <div>暂无数据</div>
        </div>
    </div>
</template>

<script>
import YCell from '@/components/cell';
import clone from 'clone';

export default {
    name: 'YTree',
    components: {
        YCell
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
                    disable: 'disable'
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
            loading: false
        };
    },
    computed: {
        isFolder() {
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
            !this.dataList.length && val && this.loadFunction();
        },
        value: {
            handler: function(nval) {
                this.$set(this, 'treeSelect', this.track ? clone(nval) : []);
                this.$set(this, 'trackLessSelect', this.track ? [] : clone(nval));
            },
            deep: true
        }
    },
    mounted() {
        !this.level && this.loadFunction();
        if (this.options && this.level) {
            // 同步加载
            !this.dataList.length && this.loadFunction();
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
    methods: {
        initLoad() {
            return this.options
                ? () => {
                    return new Promise((resolve, reject) => {
                        resolve();
                    }).then(() => {
                        return this.options;
                    });
                } : this.lazyLoad;
        },
        loadFunction(concat) {
            this.loading = true;
            this.fetchFunc(this.index, this.count, this.highlight, this.self)
                .then(data => {
                    if (concat) {
                        this.$set(this, 'dataList', this.dataList.concat(data));
                    } else {
                        this.$set(this, 'dataList', clone(data));
                    }
                    if (data.length < this.count || this.count === -1 || this.options) {
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
            .no-switch {
                display: inline-block;
                width: 18px;
            }
            .folder-icon {
                width: 12px;
                height: 20px;
                margin-right: 5px;
            }
            .arrow {
                margin-top: -2px;
            }
            &:hover {
                background: #F1F4FB;
                cursor: pointer;
            }
        }
        .level1>.no-switch {
            width: 10px;
        }
        .load-more {
            cursor: pointer;
            color: #4078c0;
            font-size: 14px;
            line-height: 32px;
            &:hover {
                color: #222222;
            }
        }
        .no-data {
            color: #a8abb3;
            font-size: 14px;
            line-height: 32px;
            text-align: center;
        }
        .is-selected {
            background: #E0E7F6;
            &:hover {
                background: #E0E7F6;
                cursor: pointer;
            }
        }
    }
</style>
