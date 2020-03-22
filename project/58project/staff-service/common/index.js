/**
 * pc组件
 */

// import { 
//     Layout,
//     sliderSpread
// } from "./components";

// export {
//     Layout,
//     sliderSpread
// } 

/**
 * 全局config配置
 */
import  './config'





/**
 * service 
 */
import loginService from './service/loginService'
import authService from './service/authService'
import operateService from './service/operateService'
import saleService from './service/saleService'
// import storeService from './service/storeService'
import myCenterService from './service/myCenterService'
import customService from './service/customService'


import operateRequest from './service/request/operateRequest'

export {
    // operateRequest,
    // loginService,
    // authService,
    // operateService,
    // saleService,
    // storeService,
    // myCenterService,
    // customService,
}



/**
 * style样式
 */

import './style/styleConfig.scss'



import {$styleConfig} from './style/styleConfig.js'

export {
    $styleConfig,
}
