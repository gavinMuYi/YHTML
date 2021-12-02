import YButton from './src/index.vue';

YButton.install = function (Vue) {
    Vue.component(YButton.name, YButton);
};

export default YButton;
