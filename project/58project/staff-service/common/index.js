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
import loginService from './service/loginService'
import authService from './service/authService'
import hrService from './service/hrService'
import orderService from './service/orderService'
import shopService from './service/shopService'


import hrRequest from './service/request/hrRequest'

export {
    hrRequest,
    loginService,
    authService,
    hrService,
    orderService,
    shopService
}

/**
 * vuex store 数据
 */

import store from './store'
export {
    store,
}

/**
 * style样式
 */

import './style/styleConfig.scss'

/**
 * utils 工具
 */
import $utils from './utils'
export {
    $utils
}
