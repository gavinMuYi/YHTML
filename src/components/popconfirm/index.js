import YPopconfirm from './src/index.vue';
import createPopperDirective from '../popper/src/createPopperDirective';

YPopconfirm.install = function (Vue) {
    Vue.component(YPopconfirm.name, YPopconfirm);
    Vue.directive('ypopconfirm', createPopperDirective(['pop']));
};

export default YPopconfirm;
