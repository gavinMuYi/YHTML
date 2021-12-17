import YDashboard from './src/index.vue';

YDashboard.install = function (Vue) {
    Vue.component(YDashboard.name, YDashboard);
};

export default YDashboard;
