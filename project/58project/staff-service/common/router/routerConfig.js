

/**
 * 个人中心
 */

import homePage from '@/pages/myCenter/homePage.vue'
import mySetting from '@/pages/myCenter/mySetting.vue'

const homeModule = [
    {
        path: '/myCenter/homePage',
        name: 'homePage',
        component: homePage,
    },
    {
        path: '/myCenter/mySetting',
        name: 'mySetting',
        component: mySetting,
    },
]

/**
 * 权限管理
 */

//账户管理
import accountList from '@/pages/auth/account/accountList.vue'
import accountEdit from '@/pages/auth/account/accountEdit.vue'

//角色管理
import roleList from '@/pages/auth/role/roleList.vue'
import roleEdit from '@/pages/auth/role/roleEdit.vue'
import roleConfig from '@/pages/auth/role/roleConfig.vue'

//权限配置
import authList from '@/pages/auth/auth/authList.vue'
import authConfig from '@/pages/auth/auth/authConfig.vue'

 const authModule = [
    //账户管理
    {
        path: '/auth/accountList',
        name: 'accountList',
        component: accountList,
    },
    {
        path: '/auth/accountEdit',
        name: 'accountEdit',
        component: accountEdit,
    },
    //角色配置
    {
        path: '/auth/roleList',
        name: 'roleList',
        component: roleList,
    },
    {
        path: '/auth/roleEdit',
        name: 'roleEdit',
        component: roleEdit,
    },
    {
        path: '/auth/roleConfig',
        name: 'roleConfig',
        component: roleConfig,
    },

    //权限配置
    {
        path: '/auth/authList',
        name: 'authList',
        component: authList,
    },
    {
        path: '/auth/authConfig',
        name: 'authConfig',
        component: authConfig,
    },
 ]
 /**
  * 运营---工作台
  */
import operateWorkStation from '@/pages/operate/operateWorkStation.vue'

/**
 * 运营---订单管理
 */
import operateOrderList from '@/pages/operate/order/orderList.vue'
import operateOrderApplyList from '@/pages/operate/order/orderApplyList.vue'
import operateOrderApplyItem from '@/pages/operate/order/orderApplyItem.vue'

/**
 * 运营—--客户端订单
 */
import clientRequireList from '@/pages/operate/order/clientRequireList.vue'
import clientRequireItem from '@/pages/operate/order/clientRequireItem.vue'

/**
 * 运营 --- 商品管理
 */
import productList from '@/pages/operate/product/productList.vue'
/**
 * 运营---服务人员管理
 */
 import workerList from '@/pages/operate/staff/workerList.vue'
 import workFormConfig from '@/pages/operate/staff/workFormConfig.vue'
 import workerItem from '@/pages/operate/staff/workerItem.vue'
 import workerItemShow from '@/pages/operate/staff/workerItemShow.vue'
 import newWorkerList from '@/pages/operate/staff/newWorkerList.vue'
 import errorWorkerList from '@/pages/operate/staff/errorWorkerList.vue'
 import returnList from '@/pages/operate/staff/returnList.vue'


 const operateModule = [
    {
        path: '/operate/operateWorkStation',
        name: 'operateWorkStation',
        component: operateWorkStation,
    },
    {
        path: '/operate/operateOrderList',
        name: 'operateOrderList',
        component: operateOrderList,
    },
    {
        path: '/operate/operateOrderApplyList',
        name: 'operateOrderApplyList',
        component: operateOrderApplyList,
    },
    {
        path: '/operate/operateOrderApplyItem',
        name: 'operateOrderApplyItem',
        component: operateOrderApplyItem,
    },
    {
        path: '/operate/productList',
        name: 'productList',
        component: productList,
    },
    {
      path: '/operate/clientRequireList',
      name: 'clientRequireList',
      component: clientRequireList,
    },
    {
      path: '/operate/clientRequireItem',
      name: 'clientRequireItem',
      component: clientRequireItem,
    },
    {
        path: '/worker/workerList',
        name: 'workerList',
        component: workerList,
    },
    {
        path: '/worker/errorWorkerList',
        name: 'errorWorkerList',
        component: errorWorkerList,
    },
    {
        path: '/worker/newWorkerList',
        name: 'newWorkerList',
        component: newWorkerList,
    },
    {
        path: '/worker/workerItem',
        name: 'workerItem',
        component: workerItem,
    },
    {
        path: '/worker/workerItemShow',
        name: 'workerItemShow',
        component: workerItemShow,
    },
    {
        path: '/worker/workFormConfig',
        name: 'workFormConfig',
        component: workFormConfig,
    },
    {
        path: '/worker/returnList',
        name: 'returnList',
        component: returnList,
    },
 ]

/**
 * 销售门店模块
 */


import saleWorkStation from '@/pages/sale/saleWorkStation.vue' //门店工作台
import orderList from '@/pages/sale/orderList.vue'//订单列表
import publicOrderList from '@/pages/sale/publicOrderList.vue'//公海订单列表
import contractList from '@/pages/sale/contractList.vue'//我的合同列表
import saleWorkList from '@/pages/sale/saleWorkList.vue'//门店全部服务人员信息
import saleSignPage from '@/pages/sale/saleSignPage.vue'
import orderConfig from '@/pages/sale/orderConfig.vue'
import saleWorkShow from '@/pages/sale/saleWorkShow.vue'
const saleModule = [
    {
        path: '/sale/saleWorkStation',
        name: 'saleWorkStation',
        component: saleWorkStation,
    },
    {
        path: '/sale/orderList',
        name: 'orderList',
        component: orderList,
    },
    {
        path: '/sale/orderConfig',
        name: 'orderConfig',
        component: orderConfig,
    },
    {
        path: '/sale/publicOrderList',
        name: 'publicOrderList',
        component: publicOrderList,
    },
    {
        path: '/sale/contractList',
        name: 'contractList',
        component: contractList,
    },
    {
        path: '/sale/saleWorkList',
        name: 'saleWorkList',
        component: saleWorkList,
    },
    {
        path: '/sale/saleWorkShow',
        name: 'saleWorkShow',
        component: saleWorkShow,
    },
    {
        path: '/sale/saleSignPage',
        name: 'saleSignPage',
        component: saleSignPage,
    },
]

/**
 * 门店
 */
import shopList from '@/pages/shop/shopList.vue'
import shopItem from '@/pages/shop/shopItem.vue'
import shopEdit from '@/pages/shop/shopEdit.vue'

const shop = [
    {
        path: '/shop/shopList',
        name: 'shopList',
        component: shopList,
    },
    {
        path: '/shop/shopItem',
        name: 'shopItem',
        component: shopItem,
    },
    {
        path: '/shop/shopEdit',
        name: 'shopEdit',
        component: shopEdit,
    },
]

/**
 * 学员列表
 */
import studentList from '@/pages/student/studentList.vue'
let student = [
    {
        path: '/student/studentList',
        name: 'studentList',
        component: studentList,
    }
]

/**
 * 重定向
 */
export default [
    {path: '/', redirect: '/myCenter/homePage'},
    ...homeModule, //我的模块
    ...authModule,//权限管理模块
    ...operateModule, //服务人员管理模块
    ...saleModule,//销售人员模块
    ...shop,//门店管理
    ...student,//学员管理
]
