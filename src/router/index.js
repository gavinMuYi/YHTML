import Vue from 'vue'
import Router from 'vue-router'
import ComponentsIndex from '@/pages/components-index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ComponentsIndex',
      component: ComponentsIndex
    }
  ]
})
