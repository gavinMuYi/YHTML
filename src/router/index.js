import Vue from 'vue';
import Router from 'vue-router';
import ComponentsIndex from '@/pages/components-index';

Vue.use(Router);
const examples = require.context('@/components', true, /example$/);
const mds = require.context('@/docs', true, /.md$/);
let childRouters = [];
for (const key of examples.keys()) {
    let name = key.replace('/example', '').replace('./', '');
    childRouters.push({
        path: name,
        name: name,
        component: examples(key).default
    });
}
for (const key of mds.keys()) {
    let name = key.replace('./', '');
    childRouters.push({
        path: name,
        name: name,
        component: mds(key).default
    });
}

export default new Router({
    routes: [{
        path: '/components',
        name: 'ComponentsIndex',
        component: ComponentsIndex,
        children: childRouters
    }]
});
