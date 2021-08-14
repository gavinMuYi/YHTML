<template>
    <div class="y-pagination_example">
        <y-pagination :total="120" :count="16" :index="1" />
    </div>
</template>

<script>
import YPagination from './src/index';
export default {
    name: 'YPaginationExample',
    components: {
        YPagination
    },
    data() {
        return {
        };
    },
    methods: {
    }
};
</script>

<style lang="less">
    .y-pagination_example {

    }
</style>
