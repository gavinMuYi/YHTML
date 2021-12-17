import YEchart from './src/index.vue';

YEchart.install = function (Vue) {
    Vue.component(YEchart.name, YEchart);
};

export default YEchart;
