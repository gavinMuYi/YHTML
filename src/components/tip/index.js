import YTip from './src/index.vue';
import createPopperDirective from '../popper/src/createPopperDirective';

YTip.install = function (Vue) {
    Vue.component(YTip.name, YTip);
    Vue.directive('ytip', createPopperDirective(['pop']));
};

export default YTip;
