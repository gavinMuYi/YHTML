<template>
    <div class="y-pagination">
        <div class="total-count">共 {{ total }} 项，每页显示
            <YPopmenu ref="count" :options="countMenus" :showSelect="true" clazz="y-pagination_count-popmenu"
                      placement="bottom-start" @change="val => { currentCount = val.value }" />
            <span class="count-change" v-ypopmenu:count.click> {{ currentCount }} <y-icon name="arrow-down" /> </span>
        </div>
        <div class="page-nums">
            <div :class="['arrow', {'disable': currentIndex === 1}]"
                 @click="currentIndex = 1"><y-icon name="goto-start" /></div>
            <div :class="['arrow', {'disable': currentIndex === 1}]"
                 @click="currentIndex--"><y-icon name="arrow-left" /></div>
            <div v-if="limit > max && currentIndex > limit - max + 2"
                 :class="['nums', {'selected': currentIndex === 1}]"
                 @click="currentIndex = 1">
                1
            </div>
            <div v-else style="display: flex">
                <div v-for="num in limit > max ? max - 1: limit" :key="'left' + num"
                     :class="['nums', {
                         'selected': currentIndex === (limit > max
                             ? (currentIndex >= max - 1 ? currentIndex + num - 2 : num)
                             : num)
                     }]"
                     @click="currentIndex = (limit > max
                         ? (currentIndex >= max - 1 ? currentIndex + num - 2 : num)
                         : num)
                     ">
                    {{ limit > max ? (currentIndex >= max - 1 ? currentIndex + num - 2 : num) : num }}
                </div>
            </div>
            <div v-if="limit > max" class="ellipsis">
                ...
            </div>
            <div v-if="limit > max && currentIndex > limit - max + 2" style="display: flex">
                <div v-for="num in max - 1" :key="'right' + num"
                     :class="['nums', {
                         'selected': limit - max + num + 1 === currentIndex
                     }]"
                     @click="currentIndex = limit - max + num + 1">
                    {{ limit - max + num + 1 }}
                </div>
            </div>
            <div v-else-if="limit > max && currentIndex <= limit - max + 2"
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
        max: {
            type: Number,
            default: 5
        }
    },
    data() {
        return {
            currentIndex: this.index,
            currentCount: this.countOptions[0] || 15
        };
    },
    computed: {
        limit() {
            return Math.ceil(this.total / this.currentCount);
        },
        countMenus() {
            return this.countOptions.map(i => {
                return {
                    key: 'key' + i,
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
                    fill: #496866;
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
                color: #a8abb3;
            }
            .nums:hover {
                background: #cbf9f1;
                color: #496866;
                cursor: pointer;
            }
            .selected {
                background: #18b9ac;
                color: #e6fffe;
                &:hover {
                    background: #18b9ac;
                    color: #e6fffe;
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
                    fill: #a8abb3;
                    width: 12px;
                    height: 12px;
                }
                &:hover {
                    background: #cbf9f1;
                    cursor: pointer;
                    .y-icon {
                        fill: #496866;
                    }
                }
            }
            .disable {
                pointer-events: none;
                .y-icon {
                    fill: #e3f0ef;
                }
            }
        }
    }
    .y-pagination_count-popmenu {
        .y-popmenu_item {
            .y-cell-label {
                display: flex;
                justify-content: center;
            }
        }
    }
</style>
