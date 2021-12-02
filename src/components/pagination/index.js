import YPagination from './src/index.vue';

YPagination.install = function (Vue) {
    Vue.component(YPagination.name, YPagination);
};

export default YPagination;
