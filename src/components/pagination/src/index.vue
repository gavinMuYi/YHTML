<template>
    <div class="y-pagination">
        <div class="total-count">共 {{ total }} 项，每页显示
            <YPopmenu ref="count" :options="countMenus" :showSelect="true" clazz="y-pagination_count-popmenu"
                      :selected="currentCount" placement="bottom-start" @change="val => { currentCount = val.value }" />
            <span class="count-change" v-ypopmenu:count.click> {{ currentCount }} <y-icon name="arrow-down" /> </span>
        </div>
        <div class="page-nums">
            <div :class="['arrow', {'disable': currentIndex === 1}]"
                 @click="currentIndex = 1"><y-icon name="goto-start" /></div>
            <div :class="['arrow', {'disable': currentIndex === 1}]"
                 @click="currentIndex--"><y-icon name="arrow-left" /></div>
            <div v-if="limit > visiblePageCount && currentIndex > limit - visiblePageCount + 2"
                 :class="['nums', {'selected': currentIndex === 1}]"
                 @click="currentIndex = 1">
                1
            </div>
            <div v-else style="display: flex">
                <div v-for="num in limit > visiblePageCount ? visiblePageCount - 1: limit" :key="'left' + num"
                     :class="['nums', {
                         'selected': currentIndex === (limit > visiblePageCount
                             ? (currentIndex >= visiblePageCount - 1 ? currentIndex + num - 2 : num)
                             : num)
                     }]"
                     @click="currentIndex = (limit > visiblePageCount
                         ? (currentIndex >= visiblePageCount - 1 ? currentIndex + num - 2 : num)
                         : num)
                     ">
                    {{ limit > visiblePageCount
                    ? (currentIndex >= visiblePageCount - 1 ? currentIndex + num - 2 : num) : num }}
                </div>
            </div>
            <div v-if="limit > visiblePageCount" class="ellipsis">
                ...
            </div>
            <div v-if="limit > visiblePageCount && currentIndex > limit - visiblePageCount + 2" style="display: flex">
                <div v-for="num in visiblePageCount - 1" :key="'right' + num"
                     :class="['nums', {
                         'selected': limit - visiblePageCount + num + 1 === currentIndex
                     }]"
                     @click="currentIndex = limit - visiblePageCount + num + 1">
                    {{ limit - visiblePageCount + num + 1 }}
                </div>
            </div>
            <div v-else-if="limit > visiblePageCount && currentIndex <= limit - visiblePageCount + 2"
                 :class="['nums', {'selected': limit === currentIndex}]"
                 @click="currentIndex = limit">
                {{ limit }}
            </div>
            <div :class="['arrow', {'disable': currentIndex === limit}]"
                 @click="currentIndex++"><y-icon name="arrow-right" /></div>
            <div :class="['arrow', {'disable': currentIndex === limit}]"
                 @click="currentIndex = limit"><y-icon name="goto-end" /></div>
        </div>
    </div>
</template>

<script>
import YPopmenu from '@/components/popmenu';
import YIcon from '@/components/icon';

export default {
    name: 'YPagination',
    components: {
        YPopmenu,
        YIcon
    },
    props: {
        total: {
            type: Number,
            default: 0
        },
        index: {
            type: Number,
            default: 1
        },
        countOptions: {
            type: Array,
            default: () => {
                return [15, 30, 50, 100];
            }
        },
        count: {
            type: Number,
            default: 0
        },
        visiblePageCount: {
            type: Number,
            default: 5
        }
    },
    data() {
        return {
            currentIndex: this.index,
            currentCount: this.count || this.countOptions[0] || 15
        };
    },
    computed: {
        limit() {
            return Math.ceil(this.total / this.currentCount);
        },
        countMenus() {
            return this.countOptions.map(i => {
                return {
                    key: i,
                    label: i,
                    value: i
                };
            });
        }
    },
    watch: {
        index(nval) {
            this.currentIndex = nval;
        },
        countOptions(nval) {
            this.currentCount = nval[0] || 15;
        },
        currentIndex() {
            this.$emit('change', {
                count: this.currentCount,
                index: this.currentIndex
            });
        },
        currentCount() {
            this.currentIndex = 1;
            this.$emit('change', {
                count: this.currentCount,
                index: this.currentIndex
            });
        }
    },
    methods: {
    }
};
</script>

<style lang="less">
    .y-pagination {
        display: flex;
        .total-count {
            font-size: 14px;
            display: flex;
            align-items: center;
            .count-change {
                display: inline-block;
                margin-left: 8px;
                .y-icon {
                    fill: @font;
                    width: 10px;
                    height: 10px;
                }
            }
        }
        .page-nums {
            display: flex;
            flex: 1;
            justify-content: flex-end;
            user-select: none;
            .ellipsis,
            .nums {
                display: flex;
                margin: 0 5px;
                width: 20px;
                height: 30px;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                color: @fontGray;
            }
            .nums:hover {
                background: @backgroundGreenHover;
                color: @font;
                cursor: pointer;
            }
            .selected {
                background: @fontHighLight;
                color: @iconDiff;
                &:hover {
                    background: @fontHighLight;
                    color: @iconDiff;
                    cursor: pointer;
                }
            }
            .arrow {
                display: flex;
                margin: 0 5px;
                width: 20px;
                height: 30px;
                align-items: center;
                justify-content: center;
                .y-icon {
                    fill: @fontGray;
                    width: 12px;
                    height: 12px;
                }
                &:hover {
                    background: @backgroundGreenHover;
                    cursor: pointer;
                    .y-icon {
                        fill: @font;
                    }
                }
            }
            .disable {
                pointer-events: none;
                .y-icon {
                    fill: @gray;
                }
            }
        }
    }
    .y-pagination_count-popmenu {
        .y-popmenu_item {
            .y-cell {
                width: 100%;
            }
            .y-cell-label {
                display: flex;
                justify-content: center;
            }
        }
    }
</style>
