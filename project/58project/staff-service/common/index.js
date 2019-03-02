/**
 * pc组件
 */

import { 
    Layout,
    sliderSpread
} from "./components";

export {
    Layout,
    sliderSpread
} 

/**
 * 全局config配置
 */
import  './config'


/**
 * 手机端组件
 */
export {

}

/**
 * 路由
 */
import router from './router'

export {
    router
}


/**
 * service 
 */
import loginService from './service/loginService.js'
import authService from './service/authService.js'
import hrService from './service/hrService.js'
import orderService from './service/orderService.js'
import saleService from './service/saleService.js'


import hrRequest from './service/request/hrRequest.js'

export {
    hrRequest,
    loginService,
    authService,
    hrService,
    orderService,
    saleService,
}

/**
 * vuex store 数据
 */

import store from './store'
import {Login} from './store/login/logGlobal.js'
export {
    store,
    Login
}

/**
 * style样式
 */

import './style/styleConfig.scss'
