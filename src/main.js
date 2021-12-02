// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// 引入demo-block
import DemoBlock from './basicComponents/demoBlock';
Vue.component('demo-block', DemoBlock);

const examples = require.context('@/components', true, /index.js$/);
for (const key of examples.keys()) {
    Vue.use(examples(key).default);
}

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
});
