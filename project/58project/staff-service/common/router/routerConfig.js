

/**
 * 首页
 */

import homePage from '@/pages/home.vue'

const homeModule = [
    {
        path: '/homePage',
        name: 'homePage',
        component: homePage,
    }
]

/**
 * 超级管理员
 */

 import accountList from '@/pages/superAdmin/accountList.vue'
 import editAccount from '@/pages/superAdmin/editAccount.vue'
 import dashboard from '@/pages/superAdmin/dashboard.vue'

 const superAdminModule = [
    {
        path: '/superAdmin/accountList',
        name: 'accountList',
        component: accountList,
    },
    {
        path: '/superAdmin/dashboard',
        name: 'dashboard',
        component: dashboard,
    },
    {
        path: '/superAdmin/editAccount',
        name: 'editAccount',
        component: editAccount,
        beforeEnter: (to, from, next) => {
            if(!(from.path == '/superAdmin/accountList' || from.path == '/superAdmin/editAccount')){
                next(false)
            } else {
                next()
            }
        }
    },
 ]

/**
 * 人力资源管理
 */
 import serviceList from '@/pages/serviceType/serviceList.vue'
 import staffList from '@/pages/staff/staffList.vue'

 const hrAdminModule = [
    {
        path: '/hrAdmin/serviceList',
        name: 'serviceList',
        component: serviceList,
    },
    {
        path: '/hrAdmin/staffList',
        name: 'staffList',
        component: staffList,
    },
 ]




/**
 * 重定向
 */
export default [
    {path: '/', redirect: '/homePage'},
    ...homeModule,
    ...superAdminModule,
    ...hrAdminModule,
]