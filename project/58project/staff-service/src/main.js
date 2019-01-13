// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import '../common/style/index.css'

import '../common/style/styleConfig.scss'

import Vue from 'vue'

import axios from 'axios'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.prototype.$axios = axios;

//引入根组件
import App from './App'

import '../common/config'

import {

    store, //引入vuex数据
    Login, //注入全局的登录信息
    
    router,
    authService,//引入路由
    loginService,
} from '../common'

Vue.config.productionTip = false






/**
 * 以下是路由拦截
 */


 //设置ajax根路径
// axios.defaults.baseURL = config.apiPath

var stack = [] //数据请求栈，为刷新token设置

axios.interceptors.request.use(config => {
    
    console.log('请求栈长度',stack.length)

    //token加入请求头
    config.headers = {
        accessToken: Login.token != null? Login.token.access_token: ''
    }
    
    //请求入栈
    stack.push(config)

    return config;
  
} , error => {
    throw error
});

// 添加响应拦截器
axios.interceptors.response.use(async response => {

    //若不是刷新token逻辑，将请求栈清空
    if(response.data.code != "10001"){

        stack.pop()
        
        console.log(stack.length,stack)
    }
    
    //请求出错
    if(response.data.code == "1"){
        throw response.data
    }
    //token失效 
    else if(response.data.code == "10001"){
        console.log('token失效，10001')
        
        //刷新token 
        await loginService.refreshToken(Login.token.refresh_token)

        //请求出栈
        let stackTop = stack.pop()
        
        //重新发起请求，清空headers
        return axios({
            ...stackTop,
            headers:{

            }
        })
    }
    //access_token错误 10002
    else if(response.data.code == "10002"){
        //清除用户信息
        await loginService.logout()
        //跳登录页
        router.push('/login');
        throw response.data
    }
    //refresh_token错误 10003
    else if(response.data.code == "10003"){
        await loginService.logout()
        router.push('/login');
        throw response.data
    }
    else{
        return response.data;
    }

    
    
}, error => {
    // 对响应错误做点什么
    throw error
});



new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    store,
  })
