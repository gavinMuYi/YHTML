<template>
    <div class="y-pagination">
        <div>共 {{ total }} 项，每页显示 {{ count }}</div>
        <div>{{ limit }}</div>
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
            default: 0
        },
        count: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
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

    }
</style>
