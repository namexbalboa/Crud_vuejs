import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewFuncionario from '@/components/NewFuncionario'
import ViewFuncionario from '@/components/ViewFuncionario'
import EditFuncionario from '@/components/EditFuncionario'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/new',
      name: 'newFuncionario',
      component: NewFuncionario
    },
    {
      path: '/edit/:id_funcionario',
      name: 'editFuncionario',
      component: EditFuncionario
    },
    {
      path: '/:id_funcionario',
      name: 'viewFuncionario',
      component: ViewFuncionario
    }
  ]
})
