import YLayout from './src/index.vue';
import YRow from './src/row.vue';
import YCol from './src/col.vue';

YLayout.install = function (Vue) {
    Vue.component(YLayout.name, YLayout);
    Vue.component(YRow.name, YRow);
    Vue.component(YCol.name, YCol);
};

export default YLayout;
