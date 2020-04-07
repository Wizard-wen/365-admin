
/**
 * 销售门店模块
 */
import saleWorkStation from '@/pages/saleWorkStation.vue'//门店工作台


import saleOrderList from '@/pages/sale/saleOrderList.vue'//订单列表
import saleOrderConfig from '@/pages/sale/saleOrderConfig.vue'//订单配置页
import saleSignPage from '@/pages/sale/saleSignPage.vue'//签约页面

import saleSettleWage from '@/pages/sale/saleSettleWage.vue'//结算工资页面
import saleTerminateContract from '@/pages/sale/saleTerminateContract.vue'//提前终止合同页面
import saleTestJsPdf from '@/pages/sale/saleTestJsPdf.vue'
import jspdfdemo2 from '@/pages/sale/jspdfdemo2.vue'

import salePublicOrderList from '@/pages/sale/salePublicOrderList.vue'//公海订单列表
import salePublicOrderConfig from '@/pages/sale/salePublicOrderConfig.vue'//公海订单详情
import saleContractList from '@/pages/sale/saleContractList.vue'//我的合同列表
import saleContractItem from '@/pages/sale/saleContractItem.vue'//我的合同详情
import saleWorkerList from '@/pages/sale/saleWorkerList.vue'//门店全部服务人员信息
import saleWorkerShow from '@/pages/sale/saleWorkerShow.vue'//服务人员详情
import saleOwnClientList from '@/pages/sale/saleOwnClientList.vue'//我维护的客户

export const saleConfigModule = [
    {
        path: '/sale/saleWorkStation',
        name: 'saleWorkStation',
        component: saleWorkStation,
    },//门店工作台
    {
        path: '/sale/saleOrderList',
        name: 'saleOrderList',
        component: saleOrderList,
    },//订单列表
    {
        path: '/sale/saleOrderConfig',
        name: 'saleOrderConfig',
        component: saleOrderConfig,
    },//订单配置页
    {
        path: '/sale/saleSignPage',
        name: 'saleSignPage',
        component: saleSignPage,
    },//签约页面
    {
        path: '/sale/salePublicOrderList',
        name: 'salePublicOrderList',
        component: salePublicOrderList,
    },//公海订单列表
    {
        path: '/sale/saleSettleWage',
        name: 'saleSettleWage',
        component: saleSettleWage,
    },//结算工资页
    {
        path: '/sale/saleTerminateContract',
        name: 'saleTerminateContract',
        component: saleTerminateContract,
    },//提前终止合同页
    {
        path: '/sale/saleTestJsPdf',
        name: 'saleTestJsPdf',
        component: saleTestJsPdf,
    },//测试合同签约页
    {
        path: '/sale/jspdfdemo2',
        name: 'jspdfdemo2',
        component: jspdfdemo2,
    },//测试合同签约页2
    {
        path: '/sale/salePublicOrderConfig',
        name: 'salePublicOrderConfig',
        component: salePublicOrderConfig,
    },//公海订单详情
    {
        path: '/sale/saleContractList',
        name: 'saleContractList',
        component: saleContractList,
    },//我的合同列表
    {
        path: '/sale/saleContractItem',
        name: 'saleContractItem',
        component: saleContractItem,
    },//我的合同详情
    {
        path: '/sale/saleWorkerList',
        name: 'saleWorkerList',
        component: saleWorkerList,
    },//门店全部服务人员信息
    {
        path: '/sale/saleWorkerShow',
        name: 'saleWorkerShow',
        component: saleWorkerShow,
    },//服务人员详情
    {
        path: '/sale/saleOwnClientList',
        name: 'saleOwnClientList',
        component: saleOwnClientList,
    },//我维护的客户
]