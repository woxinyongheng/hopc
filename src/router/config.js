import router from './index'

const routerConfig = () => {
  router.beforeEach((to, from, next) => {
    let toPath = to.name
    let fromPath = from.name
      if(location.hash.indexOf('sessionId')>-1 && location.hash.indexOf('password')>-1){
        let obj={
            userName:getUrl('userName'),
            sessionId:getUrl('sessionId'),
            password:getUrl('password'),
        }
        sessionStorage.setItem('SESSIONID',JSON.stringify(obj))

      }
    if(!localStorage.getItem('LOGINDATA')&& toPath != 'Login'){
      next('/login')
    }
    if(localStorage.getItem('LOGINDATA')&& (toPath == 'Login'||!toPath)){
      next('/index')
      return
    }


    next()
  })

  router.onReady(() => {
  })
}
function getUrl(param) {
    let paraArr = location.hash.substr(location.hash.indexOf('?')+1).split('&')
    for(let i=0;i<paraArr.length;i++){
      if(param==paraArr[i].split('=')[0]){
        return paraArr[i].split('=')[1]
      }
    }
}

export default routerConfig
