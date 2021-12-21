import YMessage from './src/index.vue';
import Vue from 'vue';

let MessageConstructor = Vue.extend(YMessage);

const MESSAGE_STATUS = ['success', 'error', 'warning', 'normal'];

let message = {};

MESSAGE_STATUS.forEach(status => {
    message[status] = function(content, duration) {
        let instance = new MessageConstructor({
            propsData: {
                content: content,
                status: status,
                duration: duration || 2000
            }
        });

        instance.vm = instance.$mount();
        document.body.appendChild(instance.vm.$el);
        instance.vm.show();
    };
});

YMessage.install = function (Vue) {
    Vue.component(YMessage.name, YMessage);
    Vue.prototype.$message = message;
};

export default YMessage;
