import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/login/login';

//用户管理
import usermanage from '@/router/usermanage/usermanage';

//医院运保主管
import hs  from  '@/router/hosupervisor/hs'


//医院设备管理员
import hm  from  '@/router/hmanage/hm'



//物业主管
import pm  from  '@/router/pmanager/pm'


//物业业务经理
import pb from  '@/router/pbusiness/pb'


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
      .concat(usermanage)
      .concat(hs)
      .concat(hm)
      .concat(pm)
      .concat(pb)

})
