<template>
    <div class="y-pagination">
        <div class="total-count">共 {{ total }} 项，每页显示 {{ count }}</div>
        <div class="page-nums">
            <div v-for="num in limit > max ? max - 1: limit" :key="num"
                 :class="['nums', {'selected': num === currentIndex}]">
                {{ num }}
            </div>
            <div v-if="limit > max" class="nums">
                ...
            </div>
            <div v-if="limit > max" :class="['nums', {'selected': max === currentIndex}]">
                {{ max }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'YPagination',
    props: {
        total: {
            type: Number,
            default: 0
        },
        index: {
            type: Number,
            default: 1
        },
        count: {
            type: Number,
            default: 15
        },
        max: {
            type: Number,
            default: 5
        }
    },
    data() {
        return {
            currentIndex: this.index,
        };
    },
    computed: {
        limit() {
            return Math.ceil(this.total / this.count);
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
        }
        .page-nums {
            display: flex;
            flex: 1;
            justify-content: flex-end;
            .nums {
                display: flex;
                margin: 0 5px;
                width: 20px;
                height: 30px;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                color: #a8abb3;
                &:hover {
                    background: #e2fffd;
                    color: #496866;
                    cursor: pointer;
                }
            }
            .selected {
                background: #18b9ac;
                color: #e6fffe;
            }
        }
    }
</style>
