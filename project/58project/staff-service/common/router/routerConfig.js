

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
 import accountConfig from '@/pages/auth/account/accountConfig.vue'

 //角色管理
 import roleList from '@/pages/auth/role/roleList.vue'
 import roleEdit from '@/pages/auth/role/roleEdit.vue'
 import roleConfig from '@/pages/auth/role/roleConfig.vue'
 
 //权限配置
 import authList from '@/pages/auth/auth/authList.vue'
 import authEdit from '@/pages/auth/auth/authEdit.vue'
import authConfig from '@/pages/auth/auth/authConfig.vue'
 

 const authModule = [
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
    {
        path: '/auth/accountConfig',
        name: 'accountConfig',
        component: accountConfig,
    },
    //角色
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

    //
    {
        path: '/auth/authList',
        name: 'authList',
        component: authList,
    },
    {
        path: '/auth/authEdit',
        name: 'authEdit',
        component: authEdit,
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


 import staffList from '@/pages/staff/staffList.vue'
 import staffItem from '@/pages/staff/staffItem.vue'

 const staffModule = [

    {
        path: '/staff/staffList',
        name: 'staffList',
        component: staffList,
    },
    {
        path: '/staff/staffItem',
        name: 'staffItem',
        component: staffItem,
    },
 ]

/**
 * 服务类型管理
 */


import typeList from '@/pages/serviceType/typeList.vue'
import typeConfig from '@/pages/serviceType/typeConfig.vue'

const serviceTypeModule = [
    {
        path: '/serviceType/typeList',
        name: 'typeList',
        component: typeList,
    },
    {
        path: '/serviceType/typeConfig',
        name: 'typeConfig',
        component: typeConfig,
    },
]

/**
 * 销售管理模块
 */
import orderList from '@/pages/sale/orderList.vue'
import orderEdit from '@/pages/sale/orderEdit.vue'


const saleModule = [
    {
        path: '/sale/orderList',
        name: 'orderList',
        component: orderList,
    },
    {
        path: '/sale/orderEdit',
        name: 'orderEdit',
        component: orderEdit,
    },
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
]