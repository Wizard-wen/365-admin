// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '../common/style/index.css'
import Vue from 'vue'

import axios from 'axios'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

//引入跟组件
import App from './App'

//引入路由
import router from '../common/router'

//引入vuex
import store from '../common/store'

//引入全局config
import  '../common/config'

//注入全局的登录信息
import {Login} from '../common/store/login/logGlobal.js'


Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
})



/**
 * 以下是路由拦截
 */


 //设置ajax根路径
axios.defaults.baseURL = config.apiPath



// 添加请求拦截器
axios.interceptors.request.use(config => {
    
    //如果存在token 请求加上token
    if(Login.token){
        heardr = {

        }
    }
    
    return config;
  
} , error => {
    throw error
});

// 添加响应拦截器
axios.interceptors.response.use(response => {
    // 对响应数据做点什么

    return response;
},error => {
    // 对响应错误做点什么
    return Promise.reject(error);
});








// //请求拦截
// request.defaultConfig.requestInterceptor = function(url,method,option,data,fileMap){
//     if(option.hasToken){
//         if(Login.token && Login.token.accessToken){
//             //如果用户已经登录，将accessToken放到header中
//             option.headers = {
//                 'accessToken' :  Login.token.accessToken,
//                 'uid' : Login.token.uid 
//             }

//         } else {
//             throw new Error('need login')
//             //如果需要登录，且用户未登录，则直接登录。
//             router.push('/login')
//         }
//     }
//     return option
// }
// //响应拦截
// request.defaultConfig.responseInterceptor = async function(data, option, stutas){

//     let _url = option.url,
//         _data = option.data;
   
//     //如果是Error，则抛出，不处理
//     if(data instanceof Error){
//         throw data
//     }

//     //否则去除response中的data
//     data = data.data

//     //默认成功
//     if(data.code == 0){
//         return data.data
//     }
//    // 默认失败
//     else if(data.code == 1){
//         throw data
//     }
//     //无效的token
//     else if(data.code == 1011002){
//         await loginService.refreshToken()

//         return request.$ajax({
//             ...option,

//             //覆盖掉用户配置的success事件，以免因重发请求导致success执行两次
//             success(data){
//                 return false;
//             }
//         })
//     }
//     //用户信息错误
//     else if(data.code == 1010001){
//         Message.error({
//             content : '用户不存在'//data.msg
//         })
//         router.push('/login')
//         throw data
//     }
//     //登录超时
//     else if(data.code == 1010002){
//         Message.error({
//             content : '登录超时'//data.msg
//         })
//         router.push('/login')
//         throw data
//     }
//     //客户端ID错误
//     else if(data.code == 1011001){
//         // return '请联系管理员'
//         Message.error({
//             content : '客户端ID错误'//data.msg
//         })
//         router.push('/login')
//         throw data
//     }
//     //无效的刷新token
//     else if(data.code == 1011003){
//         throw data
//     }
//     //无效的权限
//     else if(data.code == 1012001){
//         Message.error({
//             content : '没有权限！'//data.msg
//         })
//         router.push('/login')
//         throw data
//     }
//     //密码不正确
//     else if(data.code == 1013001){
//         Message.error({
//             content : '用户名或密码错误'//data.msg
//         })
//         router.push('/login')
//         throw data
//     } 
//     else{
//         throw data
//     }
    
// }