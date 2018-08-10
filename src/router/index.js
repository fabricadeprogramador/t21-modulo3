import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing'
import Produtos from '@/components/Produtos'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/produtos',
      name: 'Produtos',
      component: Produtos
    }
  ]
})
