

/**
 * 首页
 */

import homePage from '@/pages/home.vue'
import dashboard from '@/pages/home/dashboard.vue'

const homeModule = [
    {
        path: '/homePage',
        name: 'homePage',
        component: homePage,
    },
    {
        path: '/home/dashboard',
        name: 'dashboard',
        component: dashboard,
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
        beforeEnter: (to, from, next) => {
            if(!(from.path == '/auth/accountList' || from.path == '/auth/accountEdit')){
                next(false)
            } else {
                next()
            }
        }
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
 * 服务人员管理
 */


 import workerList from '@/pages/servicehr/staff/workerList.vue'
 import newWorkerList from '@/pages/servicehr/staff/newWorkerList.vue'
 import errorWorkerList from '@/pages/servicehr/staff/errorWorkerList.vue'
 import workerItem from '@/pages/servicehr/staff/workerItem.vue'
 import workFormConfig from '@/pages/servicehr/staff/workFormConfig.vue'

 import returnList from '@/pages/servicehr/staff/returnList.vue'
 import returnItem from '@/pages/servicehr/staff/returnItem.vue'


 const staffModule = [
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
        path: '/worker/workFormConfig',
        name: 'workFormConfig',
        component: workFormConfig,
    },
    {
        path: '/worker/returnList',
        name: 'returnList',
        component: returnList,
    },
    {
        path: '/worker/returnItem',
        name: 'returnItem',
        component: returnItem,
    },
 ]

/**
 * 服务类型管理
 */


import abilityList from '@/pages/servicehr/serviceType/abilityList.vue'
import abilityConfig from '@/pages/servicehr/serviceType/abilityConfig.vue'
import skillList from '@/pages/servicehr/serviceType/skillList.vue'
import skillConfig from '@/pages/servicehr/serviceType/skillConfig.vue'
import paperList from '@/pages/servicehr/serviceType/paperList.vue'
import paperConfig from '@/pages/servicehr/serviceType/paperConfig.vue'

const serviceTypeModule = [
    // {
    //     path: '/serviceType/abilityList',
    //     name: 'abilityList',
    //     component: abilityList,
    // },
    // {
    //     path: '/serviceType/abilityConfig',
    //     name: 'abilityConfig',
    //     component: abilityConfig,
    // },
    // {
    //     path: '/serviceType/skillList',
    //     name: 'skillList',
    //     component: skillList,
    // },
    // {
    //     path: '/serviceType/skillConfig',
    //     name: 'skillConfig',
    //     component: skillConfig,
    // },
    // {
    //     path: '/serviceType/paperList',
    //     name: 'paperList',
    //     component: paperList,
    // },
    // {
    //     path: '/serviceType/paperConfig',
    //     name: 'paperConfig',
    //     component: paperConfig,
    // },
]

/**
 * 销售管理模块
 */
import orderList from '@/pages/sale/orderList.vue'
import orderConfig from '@/pages/sale/orderConfig.vue'
import orderEdit from '@/pages/sale/orderEdit.vue'
import orderAssignList from '@/pages/sale/orderAssignList.vue'
import orderWorkList from '@/pages/sale/orderWorkList.vue'


const saleModule = [
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
        path: '/sale/orderEdit',
        name: 'orderEdit',
        component: orderEdit,
    },
    {
        path: '/sale/orderAssignList',
        name: 'orderAssignList',
        component: orderAssignList,
    },
    {
        path: '/sale/orderWorkList',
        name: 'orderWorkList',
        component: orderWorkList,
    },
]

/**
 * 门店
 */
import shopList from '@/pages/shop/shopList.vue'
import shopItem from '@/pages/shop/shopItem.vue'
import shopEdit from '@/pages/shop/shopEdit.vue'
import salePersonList from '@/pages/shop/salePersonList.vue'

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
    {
        path: '/shop/salePersonList',
        name: 'salePersonList',
        component: salePersonList,
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
    {path: '/', redirect: '/homePage'},
    ...homeModule, //我的模块
    ...authModule,//权限管理模块
    ...staffModule, //服务人员管理模块
    ...serviceTypeModule,//服务类型管理模块
    ...saleModule,//销售人员模块
    ...shop,//门店管理
    ...student,//学员管理
]
