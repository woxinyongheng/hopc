import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/login/login'

Vue.use(Router)

export default new Router({
  routes: [
      {
          path:'/login',
          name:'Login',
          component:Login
      },
      {
          path: '/index',
          name: 'Index',
          component: Index
      }
  ]
})
