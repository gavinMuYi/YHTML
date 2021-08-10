import Vue from 'vue';
import Router from 'vue-router';
import ComponentsIndex from '@/pages/components-index';
import YTreeExample from '@/components/tree/example';
import YCellExample from '@/components/cell/example';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'ComponentsIndex',
            component: ComponentsIndex
        },
        {
            path: '/tree',
            name: 'YTreeExample',
            component: YTreeExample
        },
        {
            path: '/cell',
            name: 'YCellExample',
            component: YCellExample
        }
    ]
});
