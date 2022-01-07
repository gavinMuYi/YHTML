import YDialog from './src/index.vue';

YDialog.install = function (Vue) {
    Vue.component(YDialog.name, YDialog);
};

export default YDialog;
