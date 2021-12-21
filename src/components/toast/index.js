import YToast from './src/index.vue';
import Vue from 'vue';

let ToastConstructor = Vue.extend(YToast);

let toast = function(config) {
    let instance = new ToastConstructor({
        propsData: config
    });

    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
};

YToast.install = function (Vue) {
    Vue.component(YToast.name, YToast);
    Vue.prototype.$toast = toast;
};

export default YToast;
