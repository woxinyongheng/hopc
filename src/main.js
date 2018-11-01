// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store'


//路由守卫
import routerConfig from './router/config'
routerConfig()


//import jquery 和 element
import $ from 'jquery'
import { Message } from 'element-ui';

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
import axios from 'axios'
import qs from 'qs'



Vue.config.productionTip = false



//axios 请求与响应配置

axios.defaults.baseURL = __PATH.FULLPATH;
axios.defaults.withCredentials=false //不设置
Vue.prototype.$http = {
    get: (url, param, flag) => {
        return axios.get(url, {
            params: param
        }).then((res) => {
            return Promise.resolve(res.data)
        }).catch(() => {
            return Promise.resolve(response)
        })
    },
    post: (url, param, flag) => {
        if(localStorage.getItem('LOGINDATA')){
            var obj = JSON.parse(localStorage.getItem('LOGINDATA'))
            param.unitCode = obj.unitCode
            param.hospitalCode = obj.hospitalCode
            param.userId = obj.id
            param.roleCode = obj.roleCode
            param.userName = obj.name
        }
        let params = qs.stringify(param)
        return axios.post(url, params).then((res) => {
            return Promise.resolve(res.data)
        }).catch((res) => {
            return Promise.resolve(res)
        })
    }
}

//全局请求响应配置
axios.interceptors.request.use(config => { //spinShowSet
    store.commit('spinShowSet',true)
    config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

    return config
}, error =>{
    store.commit('spinShowSet',false)
    return Promise.reject(error)
})

axios.interceptors.response.use(data => {
    if(data.data.code!=200){
        Message.error(data.data.message)
    }
    store.commit('spinShowSet',false)
    return data
}, error => {
    store.commit('spinShowSet',false)
    return Promise.reject(error)
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
    store,
  router,
  components: { App },
  template: '<App/>'
})
