<template>
    <div :class="['component-key-index', options.separate
    ? 'key-index-separate' : 'key-index-default', options.tabGroup[0].tabTitle ? 'has-title' : '']">
        <div class="tab-title-group" v-if="options.tabGroup[0].tabTitle">
            <div
                :class="['tab-title',
                         {'selected-tab-title': options.tabGroup.length > 1 && currentBodyOptions.index === index}]"
                :style="{'max-width': `calc(${100/options.tabGroup.length}% - ${28/options.tabGroup.length}px)`}"
                v-for="(group, index) in options.tabGroup"
                :key="'tab-title' + index"
                :title="group.tabTitle"
                @click="currentBodyOptions = { ...group, index: index}; tabChange++">
                {{ group.tabTitle }}
            </div>
            <div class="more-func" v-if="options.moreFunctions.length"
                 v-ypopmenu:more.click><y-icon name="more" /></div>
            <y-popmenu v-if="options.moreFunctions.length" ref="more"
                       placement="bottom-start" :options="moreFunc(options.moreFunctions)"
                       @select="handleMore($event, options.moreFunctions)" />
        </div>
        <key-index-body ref="key-index-body" :key="tabChange" :options="currentBodyOptions"
                        :separateWidth="options.separateWidth" @innerEmit="doEmit"
                        :simpler="!Boolean(options.tabGroup[0].tabTitle)"/>
    </div>
</template>

<script>
import equal from 'fast-deep-equal';
import { assembleUrlGroup } from './processData';
import { moreFunc, handleMore } from './utils';
import KeyIndexBody from './keyIndexBody';

export default {
    name: 'KeyIndex',
    components: {
        KeyIndexBody
    },
    provide() {
        return {
            _cache: this.cache
        };
    },
    inject: ['data__'],
    props: {
        options: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    data() {
        return {
            tabChange: 0,
            moreFunc: moreFunc,
            handleMore: handleMore,
            URLS: [],
            currentBodyOptions: { ...this.options.tabGroup[0], index: 0 },
            cache: {
                dataSource: {},
                globalLoading: false
            }
        };
    },
    watch: {
        'data__.params': {
            handler: function (newValue, oldValue) {
                if (!equal(newValue, oldValue)) {
                    this.setCacheData();
                }
            },
            deep: true
        }
    },
    created() {
        this.URLS = assembleUrlGroup(this.options);
        this.setCacheData();
    },
    methods: {
        setCacheData() {
            this.cache.globalLoading = true;
            this.cache.dataSource = {};
            let fetchList = [];
            this.URLS.forEach(item => {
                fetchList.push(this.getData(item.url));
            });
            Promise.all(fetchList).then(res => {
                this.cache.globalLoading = false;
            });
        },
        getData(url) {
            return this.$ajax.get(url, {
                params: {
                    ...this.data__.params
                }
            }).then(res => {
                if (res.code === 0) {
                    this.$set(this.cache.dataSource, url, res.data);
                }
                else {
                    this.$message.error(res.msg || url + ' error');
                }
            }).catch(err => {
                this.$message.error(err.msg || url + ' error');
            });
        },
        doEmit(val) {
            this.$emit(val.eventName, Object.assign(val.payload, { keyIndex: this }));
        }
    }
};
</script>

<style lang="less">
.component-key-index {
    box-sizing: border-box;
    min-height: 140px;
    height: 100%;
    width: 100%;
    .tab-title-group {
        font-size: 14px;
        line-height: 15px;
        font-family: PingFangSC-Medium;
        .more-func {
            float: right;
            width: 18px;
            .y-icon {
                width: 18px;
                height: 18px;
            }
        }
        .tab-title {
            box-sizing: border-box;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
            padding-right: 14px;
            margin-bottom: 23px;
            padding-left: 14px;
            cursor: pointer;
            border-left: 1px solid rgba(30, 35, 48, 0.16);
            &:first-child {
                border-left: none;
                padding-left: 0px;
            }
        }
        .selected-tab-title {
            color: #4A70FF;
        }
    }
    .key-index-body {
        height: 100%;
    }
}
.has-title {
    .key-index-body {
        height: ~'calc(100% - 40px)';
    }
}
.key-index-default {
    box-shadow: 2px 4px 10px 0 rgba(30, 35, 48, 0.08);
    border-radius: 6px;
    border: solid 1px #E1E6F0;
    padding: 24px 0;
    .tab-title-group {
        padding: 0 24px;
    }
}
.key-index-separate {
    .tab {
        flex: 1;
        min-height: 140px;
    }
}
.field-info-tip {
    background: #F8FAFB;
}
</style>
