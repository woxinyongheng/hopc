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
// 引入echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts



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
            //设备类别统一接口
            if(url=='equipmentConfigController/getDeviceTypeList'){
                param.unitCode = obj.unitCode
                param.hospitalCode = obj.hospitalCode
                param.roleCode = obj.roleCode
                if(obj.roleCode=='dcmanager'){//设备管理员
                    param.eqAdminCode = obj.id
                }else if(obj.roleCode=='ybadmin'){
                    param.userId = obj.id
                }else{
                    param.companyCode = obj.companyCode
                }
            }else{
                param.unitCode = obj.unitCode
                param.hospitalCode = obj.hospitalCode
                param.userId = obj.id
                param.roleCode = obj.roleCode
                param.userName = obj.name
            }

        }
        let params=''
        if(param.flagkuayu){
            var formdata = new FormData();
            for(var item in param){
                //设备报修
                if(item=='repairAttachmentUrl' && param[item].length){
                    param[item].forEach(function (i) {
                        formdata.append(item, i);
                    })
                }else{
                    formdata.append(item, param[item]||'');

                }
            }
            params = formdata
        }else{
            params = qs.stringify(param)
        }
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
    config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8;multipart/form-data'

    return config
}, error =>{
    store.commit('spinShowSet',false)
    return Promise.reject(error)
})

axios.interceptors.response.use(data => {
    store.commit('spinShowSet',false)
    if(!data.data.code){
        download(data.data)
    }
    if(data.data.code!=200){
        Message.error(data.data.message)
    }


    return data
}, error => {
    store.commit('spinShowSet',false)
    return Promise.reject(error)
})


function download (data) {
    if (!data) {
        return
    }
    let url = window.URL.createObjectURL(new Blob([data]))
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', 'excel.xlsx')

    document.body.appendChild(link)
    link.click()
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
    store,
  router,
  components: { App },
  template: '<App/>'
})
