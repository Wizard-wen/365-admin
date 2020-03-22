// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import '../common/style/index.css'

import '../common/style/styleConfig.scss'

import Vue from 'vue'

import axios from 'axios'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import './element-variables.scss'

Vue.use(ElementUI);
import ECharts from 'vue-echarts'


import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'

import 'echarts/lib/component/title'; //引入标题组件
import 'echarts/lib/component/legend'; //引入图例组件
import 'echarts/lib/component/tooltip'; //引入图例组件
import 'echarts/lib/component/toolbox'; //引入图例组件

Vue.component('chart', ECharts)


Vue.prototype.$axios = axios;

import {$styleConfig} from '../common/index.js'

import {$utils} from './utils/index'

Vue.prototype.$utils = $utils
Vue.prototype.$styleConfig = $styleConfig

import '@/pages/componentexample/components/index.js' 

import '../common/directives/index.js'

import '@/public/components/index.js'

//引入根组件
import App from './App'

import '../common/config'


/**
 * 路由
 */
import router from './router/index.js'

import {loginService} from './service/login'
import { mapState } from 'vuex'
import {store} from './store/index'


Vue.config.productionTip = false






/**
 * 以下是路由拦截
 */

 //设置ajax根路径
axios.interceptors.request.use(config => {
    //token加入请求头
    config.headers = {
        accessToken: store.state.loginModule.token != null? store.state.loginModule.token.access_token: ''
    }
    return config;
  
} , error => {
    throw error
});

// 添加响应拦截器
axios.interceptors.response.use(async response => {
    
    //请求出错
    if(response.data.code == "1"){
        throw response.data
    }
    //token失效 
    else if(response.data.code == "10001"){
        
        //刷新token 
        await loginService.refreshToken(store.state.loginModule.token.refresh_token)

        //重发请求
        return axios(response.config)
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


Vue.mixin({
    filters: {
        /**
         * 过滤时间 年月日
         * @param {*} value 
         */
        timeToDayFomatter(value){
            if(value == 0){
                return '-'
            }
            return $utils.formatDate(new Date(value), 'yyyy-MM-dd')
        },
        /**
         * 过滤时间  年月日 时分秒
         * @param {*} value 
         */
        timeToSecondFomatter(value){
            if(value == 0){
                return '-'
            }
            return $utils.formatDate(new Date(value), 'yyyy-MM-dd hh:mm:ss')
        },
    },
    computed: {
        ...mapState({
            presentUser: state => state.loginModule.user,
            accessToken: state => state.loginModule.user.access_token,
            customizeUploadHeader: state => {
                return {
                    accessToken: state.loginModule.user.access_token
                }
            }
		}),
    }
})



new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    store,
})
