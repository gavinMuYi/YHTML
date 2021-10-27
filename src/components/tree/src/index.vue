<template>
    <div class="y-tree" :style="treeStyle" :id="treeId" ref="treePanel">
        <slot name="line"
              :data="self" :level="level" :loading="loading"
              :isSelected="isSelected" :isFolder="isFolder"
              :extendStatus="extendStatus" :tracked="tracked"
              :extend="extend" :extendSelect="extendSelect"
              :handleSelect="handleSelect"
              :multipleSelect="multipleSelect">
            <div
                :ref="(self && self[_maps.cascade])
                    ? (extendStatus ? 'cascadeLeavesShow' : 'cascadeleavesHide')
                : (extendStatus ? 'leavesShow' : 'leavesHide')"
                v-if="self" @click="extendSelect" @mouseenter="extendCascade"
                :class="[
                    'list-item',
                    `level${level}`,
                    {'is-selected': isSelected},
                    {'cascade-open': isFolder && self && self[_maps.cascade] && extendStatus}
                ]"
                :style="`padding-left: ${15 * (level - beforeCascadeLevel - 1) + 8}px`">
                <y-icon :name="loading ? 'loading' : `arrow-${extendStatus ? 'up' : 'down'}`"
                        :class="['arrow', {'loading': loading}]" v-if="isFolder && !(self && self[_maps.cascade])"/>
                <span v-else class="no-arrow"></span>
                <span class="label-item">
                    <span v-if="multiple" @click.stop="multipleSelect">
                        <y-checkbox :status="tracked" :disable="self[_maps.disable] || fatherDisableStatue" />
                    </span>
                    <slot name="item" :data="self" :level="level">
                        <y-cell :highlight="highlight" :label="self[_maps.label]"></y-cell>
                    </slot>
                </span>
                <y-icon :name="loading ? 'loading' : `arrow-${extendStatus ? 'left' : 'right'}`"
                        :class="['cascade-arrow', 'arrow', {'loading': loading}]"
                        v-if="isFolder && self && self[_maps.cascade]"/>
            </div>
        </slot>
        <div :class="['y-tree-children_group', {'cascade-fixed': self && self[_maps.cascade] === 'fixed'}]"
             v-show="extendStatus" ref="childrenContent" :style="{ ...leafGroupStyle, ...topStyle }"
             :extendStatus="extendStatus" :cascadeRelative="self && self[_maps.cascade] === 'relative'">
            <y-tree
                v-for="(child, cIndex) in dataList" :key="child[_maps.key] + cIndex + '-' + level"
                ref="leaf"
                :accordion="accordion"
                :options="child[_maps.children]"
                :lazyLoad="lazyLoad"
                :level="level + 1"
                :self="child"
                :maps="_maps"
                :track="track"
                :count="count"
                :treeSize="treeSize"
                :multiple="multiple"
                :fatherStatus="tracked"
                :cascadeMode="cascadeMode"
                :fatherID="fatherID || treeId"
                :fatherDisableStatue="Boolean(self && self[_maps.disable])"
                :beforeCascadeLevel="(self && self[_maps.cascade]) ? level : beforeCascadeLevel"
                :cascadeLevel="cascadeLevel + ((self && self[_maps.cascade]) ? 1 : 0)"
                :tracklessData="trackLessSelect.concat(tracklessData)"
                :selected="checkTrack(child[_maps.key])"
                @childSelect="handleChildSelect">
                <template slot="line" slot-scope="props">
                    <slot name="line"
                          :data="props.data" :level="props.level" :loading="props.loading"
                          :isSelected="props.isSelected" :isFolder="props.isFolder"
                          :extendStatus="props.extendStatus" :tracked="props.tracked"
                          :extend="props.extend" :extendSelect="props.extendSelect"
                          :handleSelect="props.handleSelect"
                          :multipleSelect="props.multipleSelect">
                        <template slot="item" slot-scope="props">
                            <slot name="item" :data="props.data" :level="props.level">
                                <y-cell :highlight="highlight" :label="props.data[_maps.label]"></y-cell>
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
        fatherDisableStatue: {
            type: Boolean,
            default: false
        },
        cascadeBottom: {
            type: Number,
            default: 32
        },
        cascadeMode: {
            type: String,
            default: ''
        },
        accordion: {
            type: Boolean,
            default: false
        },
        beforeCascadeLevel: {
            type: Number,
            default: 0
        },
        fatherID: {
            type: String,
            default: null
        },
        treeSize: {
            type: Array,
            default: null
        },
        cascadeLevel: {
            type: Number,
            default: 0
        },
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
                    extend: 'extend',
                    cascade: 'cascade'
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
            total: null,
            treeId: 'ytree-' + Math.random(),
            cascadeMaxLevel: 1,
            cascadeTop: 0,
            childrenContent: {
                scrollTop: 0,
                offsetTop: 0,
                contentOffsetTop: 0
            }
        };
    },
    computed: {
        _maps() {
            return {
                key: 'key',
                label: 'label',
                children: 'children',
                hasChildren: 'hasChildren',
                disable: 'disable',
                extend: 'extend',
                cascade: 'cascade',
                ...this.maps
            };
        },
        isFolder() {
            if (!this.self) return true;
            return (this.self[this._maps.children]
                && this.self[this._maps.children].length)
                || this.self[this._maps.hasChildren];
        },
        tracked() {
            if (this.multiple) {
                if (this.fatherStatus === 'all' && !this.self[this._maps.disable]) {
                    return 'all';
                }
                if (this.fatherStatus === 'all' && this.fatherDisableStatue) {
                    return 'all';
                }
                if (this.selected && this.selected[this._maps.key]) {
                    return this.selected.half ? 'half' : 'all';
                } else {
                    return 'empty';
                }
            }
            return this.selected && this.selected[this._maps.key] ? 'selected' : '';
        },
        isSelected() {
            if (!this.multiple) {
                return this.tracked && !this.isFolder;
            } else {
                return false;
            }
        },
        treeStyle() {
            let style = {};
            if (!this.level && this.treeSize) {
                style.position = 'relative';
                style.display = 'inline-block';
                style.width = this.cascadeMaxLevel * this.treeSize[0] + 'px';
                style.height = this.cascadeTop + this.treeSize[1] + 'px';
            }
            return style;
        },
        leafGroupStyle() {
            let style = {};
            if (this.treeSize) {
                if (!this.level || (this.self && this.self[this._maps.cascade])) {
                    style.width = this.treeSize[0] + 'px';
                }
                if (!this.level) {
                    style.height = this.treeSize[1] + 'px';
                    style.overflow = 'auto';
                    style.border = '1px solid #e3f0ef';
                    style.boxSizing = 'border-box';
                }
                if (this.self && this.self[this._maps.cascade]) {
                    style.position = 'absolute';
                    style.top = '0px';
                    style.left = this.treeSize[0]
                        * (this.cascadeLevel + ((this.self && this.self[this._maps.cascade]) ? 1 : 0)) + 'px';
                    style.height = this.treeSize[1] + 'px';
                    style.overflow = 'auto';
                    style.border = '1px solid #e3f0ef';
                    style.boxSizing = 'border-box';
                }
            }
            return style;
        },
        topStyle() {
            if (!this.treeSize) {
                return {};
            }
            let contentOffsetTop = this.childrenContent.contentOffsetTop;
            let top = this.childrenContent.offsetTop - this.childrenContent.scrollTop;
            top > (this.treeSize[1] + contentOffsetTop - this.cascadeBottom)
                && (top = this.treeSize[1] + contentOffsetTop - this.cascadeBottom);
            top < contentOffsetTop && (top = contentOffsetTop);
            return {
                top: top + 'px'
            };
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
        },
        options() {
            this.init();
        }
    },
    mounted() {
        this.init();
        this.cascadeDomObserver();
        this.cascadeMode && this.treeObserver();
    },
    methods: {
        init() {
            this.index = 1;
            if (this.self && this.self.extend) {
                this.extendSelect();
            }
            !this.level && this.loadFunction(false);
            if (this.options && this.level) {
                // 同步加载
                !this.dataList.length && this.loadFunction(false);
            }
            if (this.tracklessData.length && this.self) {
                let reshow = this.tracklessData.filter(item => {
                    return item[this._maps.key] === this.self[this._maps.key];
                })[0];
                if (reshow && this.multiple) {
                    if (!this.isFolder) {
                        this.$emit('childSelect', this.self, true);
                    } else {
                        let selected = clone(this.self);
                        delete selected[this._maps.children];
                        delete selected[this._maps.hasChildren];
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
                    this.$emit('loaded', this.total, this.level);
                    this.loading = false;
                });
        },
        extend() {
            this.isFolder && (this.extendStatus = !this.extendStatus);
        },
        handleSelect() {
            if (!this.multiple && !this.isFolder) {
                this.$emit('childSelect', this.self);
            }
            if (this.multiple && !this.isFolder) {
                this.$emit('childSelect', this.self, true);
            }
        },
        extendAction(closeChildContent) {
            let loop = (arr) => {
                arr.forEach(leaf => {
                    leaf.$refs.leavesShow && leaf.$refs.leavesShow.click();
                    leaf.$refs.cascadeLeavesShow && leaf.$refs.cascadeLeavesShow.click();
                    leaf.$refs.leaf && loop(leaf.$refs.leaf);
                });
            };
            if ((this.self && this.self[this._maps.cascade]) || closeChildContent) {
                this.$refs.leaf && loop(this.$refs.leaf);
                let parent = this.$parent;
                while (parent.$parent && parent.self && !parent.self[this._maps.cascade]) {
                    parent = parent.$parent;
                }
                let cascadeLoop = (arr) => {
                    arr.forEach(leaf => {
                        if (leaf._uid !== this._uid) {
                            leaf.$refs.cascadeLeavesShow && leaf.extendSelect(true);
                            leaf.$refs.leaf && cascadeLoop(leaf.$refs.leaf);
                        }
                    });
                };
                parent.$refs.leaf && cascadeLoop(parent.$refs.leaf);
            }
            if (this.accordion) {
                this.$parent.$refs.leaf && this.$parent.$refs.leaf.forEach(leaf => {
                    if (leaf._uid !== this._uid) {
                        leaf.$refs.leaf && loop(leaf.$refs.leaf);
                    }
                });
            }
        },
        extendCascade(close) {
            if (this.self && this.self[this._maps.cascade] && this.cascadeMode === 'hover') {
                this.extendAction();
                this.isFolder && (this.extendStatus = true);
            }
        },
        extendSelect(close) {
            if (!close && this.self && this.self[this._maps.cascade] && this.cascadeMode === 'hover') {
                return;
            }
            if (!this.isFolder && !this.multiple && this.cascadeMode) {
                this.extendAction(true);
            }
            this.extendAction();
            this.extend();
            if (this.self[this._maps.disable] || this.fatherDisableStatue) {
                return;
            }
            this.handleSelect();
        },
        multipleSelect() {
            if (this.self[this._maps.disable] || this.fatherDisableStatue) {
                return;
            }
            let selected = clone(this.self);
            delete selected[this._maps.children];
            delete selected[this._maps.hasChildren];
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
                    let selectedChildren = clone(this.selected[this._maps.children] || []);
                    if (this.tracked === 'all') {
                        selectedChildren = [];
                        clone(this.dataList).forEach(item => {
                            if (!item[this._maps.disable]) {
                                delete item[this._maps.children];
                                delete item[this._maps.hasChildren];
                                selectedChildren.push(item);
                            }
                        });
                    }
                    let childIndex = -1;
                    let historyChildHalf = {};
                    selectedChildren.forEach((i, index) => {
                        if (i.half) {
                            historyChildHalf[index] = true;
                        }
                        i[this._maps.key] === item[this._maps.key] && (childIndex = index);
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
                    delete selfSelected[this._maps.children];
                    delete selfSelected[this._maps.hasChildren];
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
                        i[this._maps.key] === item[this._maps.key] && (selectedIndex = index);
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
                return this.selected[this._maps.children] && this.selected[this._maps.children].filter(item => {
                    return item[this._maps.key] === key;
                })[0];
            } else {
                return this.treeSelect.filter(item => {
                    return item[this._maps.key] === key;
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
                            flat(item[this._maps.children]);
                        }
                    });
                };
                flat(clone(this.treeSelect));
                return flated;
            }
        },
        cascadeDomObserver() {
            if (this.self && this.self[this._maps.cascade]) {
                document.getElementById(this.fatherID).appendChild(this.$refs.childrenContent);
                if (this.self[this._maps.cascade] === 'relative') {
                    let parent = this.$parent;
                    while (parent && parent.self && !parent.self[this._maps.cascade]) {
                        parent = parent.$parent;
                    }
                    let content = parent.$refs.childrenContent;
                    content && content.addEventListener('scroll', () => {
                        this.childrenContent.scrollTop = content.scrollTop;
                    });
                    const targetNode = content;
                    const config = { attributes: true, childList: true, subtree: true };
                    const callback = (mutationsList, observer) => {
                        let contentOffsetTop = 0;
                        if (this.$el.offsetParent) {
                            contentOffsetTop = this.$el.offsetParent.id === (this.fatherID || this.treeId) ?
                                0 : this.$el.offsetParent.offsetTop;
                        }
                        this.childrenContent.contentOffsetTop = contentOffsetTop;
                        this.childrenContent.offsetTop = (this.$el.offsetTop + contentOffsetTop) || 0;
                    };
                    const observer = new MutationObserver(callback);
                    observer.observe(targetNode, config);
                }
            }
        },
        treeObserver() {
            if (!this.level) {
                let treePanel = this.$refs.treePanel;
                const targetNode = treePanel;
                const config = { attributes: true, childList: true, subtree: true };
                const callback = (mutationsList, observer) => {
                    let totalcascadelevel = 0;
                    let top = 0;
                    for (let i = 0; i < (this.$refs.treePanel ? this.$refs.treePanel.children.length : 0); i++) {
                        let dom = this.$refs.treePanel.children[i];
                        if (dom.attributes.extendStatus) {
                            totalcascadelevel++;
                            if (dom.attributes.cascadeRelative) {
                                top = dom.offsetTop;
                            }
                        }
                    }
                    this.cascadeTop = top;
                    this.cascadeMaxLevel = totalcascadelevel;
                };
                const observer = new MutationObserver(callback);
                observer.observe(targetNode, config);
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
            .cascade-arrow {
                position: absolute;
                right: 5px;
                margin-top: 5px;
            }
            .loading {
                fill: #18b9ac;
                width: 14px;
                height: 14px;
                margin-top: 3px;
                margin-right: 5px;
            }
            &:hover {
                background: #cbf9f1;
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
            background: #a4ede0;
            &:hover {
                background: #a4ede0;
                cursor: pointer;
            }
        }
        .cascade-open{
            background: #cbf9f1;
            &:hover {
                background: #cbf9f1;
                cursor: pointer;
            }
        }
    }
</style>
