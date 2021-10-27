// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import createPopperDirective from '@/components/popper/src/createPopperDirective';

Vue.directive('ypop', createPopperDirective());
Vue.directive('ypopmenu', createPopperDirective(['pop']));

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
});
