import YPopper from './src/index.vue';
import createPopperDirective from './src/createPopperDirective';

YPopper.install = function (Vue) {
    Vue.component(YPopper.name, YPopper);
    Vue.directive('ypop', createPopperDirective());
};

export default YPopper;
