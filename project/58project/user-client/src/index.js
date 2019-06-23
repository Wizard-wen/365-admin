
import Vue from 'vue'
import App from './App'
import axios from 'axios'
Vue.prototype.$axios = axios;
//全局样式
import '../common/style/index.css'
import '../common/style/styleConfig.scss'

import router from '../common/router'
import store from '../common/store'

//全局引入组件
import {
    HogFooter,
    HogHeader,
    HogPage
} from '../common/components'

Vue.config.productionTip = false

//全局引入组件
Vue.component('HogFooter',HogFooter)
Vue.component('HogHeader',HogHeader)
Vue.component('HogPage',HogPage)


// 添加响应拦截器
axios.interceptors.response.use(async response => {

    //请求出错
    if(response.data.code == "1"){
        throw response.data
    }
    //token失效
    else if(response.data.code == "10001"){

        //刷新token
        // await loginService.refreshToken(store.state.loginModule.token.refresh_token)

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

const Hogwards = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
})
