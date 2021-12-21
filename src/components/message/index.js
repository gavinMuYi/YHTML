import YMessage from './src/index.vue';

YMessage.install = function (Vue) {
    Vue.component(YMessage.name, YMessage);
};

export default YMessage;
