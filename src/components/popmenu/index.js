import YPopmenu from './src/index.vue';
import createPopperDirective from '../popper/src/createPopperDirective';

YPopmenu.install = function (Vue) {
    Vue.component('YPopmenu', YPopmenu);
    Vue.directive('ypopmenu', createPopperDirective(['pop']));
};

export default YPopmenu;
