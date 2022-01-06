import YPanel from './src/index.vue';

YPanel.install = function (Vue) {
    Vue.component(YPanel.name, YPanel);
};

export default YPanel;
