import Vue from 'vue';
import Router from 'vue-router';
import ComponentsIndex from '@/pages/components-index';
import Mdbutton from '../examples/button.md';

Vue.use(Router);
const examples = require.context('@/components', true, /example$/);
let exampleRouters = [];
for (const key of examples.keys()) {
    let name = key.replace('/example', '').replace('./', '');
    exampleRouters.push({
        path: name,
        name: name + 'Example',
        component: examples(key).default
    });
}

exampleRouters.push({
    path: 'mdbutton',
    name: 'Mdbutton',
    component: Mdbutton
});

export default new Router({
    routes: [{
        path: '/components',
        name: 'ComponentsIndex',
        component: ComponentsIndex,
        children: exampleRouters
    }]
});
