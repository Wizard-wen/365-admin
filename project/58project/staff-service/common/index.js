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
import operateService from './service/operateService'
import saleService from './service/saleService'
import storeService from './service/storeService'
import myCenterService from './service/myCenterService'
import customService from './service/customService'


import operateRequest from './service/request/operateRequest'

export {
    operateRequest,
    loginService,
    authService,
    operateService,
    saleService,
    storeService,
    myCenterService,
    customService,
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
import {$utils} from './utils/index.js'
export {
    $utils,
}


import {$styleConfig} from './style/styleConfig.js'

export {
    $styleConfig,
}
