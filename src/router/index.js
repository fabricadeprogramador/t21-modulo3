import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing'
import Produtos from '@/components/Produtos'
import Clientes from '@/components/Clientes'
import Financeiro from '@/components/Financeiro'
import Estabelecimentos from '@/components/Estabelecimentos'
import Usuarios from '@/components/Usuarios'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: Landing
    },
    {
      path: '/produtos',
      name: 'Produtos',
      component: Produtos
    },
    {
      path: '/clientes',
      name: 'Clientes',
      component: Clientes
    },
    {
      path: '/financeiro',
      name: 'Financeiro',
      component: Financeiro
    },
    {
      path: '/estabelecimentos',
      name: 'Estabelecimentos',
      component: Estabelecimentos
    },
    {
      path: '/usuarios',
      name: 'Usuarios',
      component: Usuarios
    }
  ]
})
