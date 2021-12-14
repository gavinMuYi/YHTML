// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
// 引入demo-block
import DemoBlock from './basicComponents/demoBlock';
Vue.component('demo-block', DemoBlock);

const comps = require.context('@/components', true, /index.js$/);
for (const key of comps.keys()) {
    Vue.use(comps(key).default);
}

Vue.config.productionTip = false;

const ajax = axios.create({
    headers: { 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' }
});
Vue.prototype.$ajax = axios;
Vue.prototype.$ajax.post = function (url, options) {
    if (url[0] === '/') {
        url = '/db' + url;
    }
    options = qs.stringify({ data: JSON.stringify(options) });
    return ajax.post(url, options).then(res => Promise.resolve(res.data));
};
Vue.prototype.$ajax.get = function (url, options) {
    if (url[0] === '/' && url.indexOf('/translate') === -1 && url.indexOf('/txtdata') === -1) {
        url = '/db' + url;
    }
    return ajax.get(url, options).then(res => Promise.resolve(res.data));
};

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
});
