
/**
 * 销售门店模块
 */
import saleWorkStation from '@/pages/saleWorkStation.vue'//门店工作台


import orderList from '@/pages/sale/orderList.vue'//订单列表
import orderConfig from '@/pages/sale/orderConfig.vue'//订单配置页
import saleSignPage from '@/pages/sale/saleSignPage.vue'//签约页面
import publicOrderList from '@/pages/sale/publicOrderList.vue'//公海订单列表
import publicOrderConfig from '@/pages/sale/publicOrderConfig.vue'//公海订单详情
import contractList from '@/pages/sale/contractList.vue'//我的合同列表
import contractItem from '@/pages/sale/contractItem.vue'//我的合同详情
import saleWorkerList from '@/pages/sale/saleWorkerList.vue'//门店全部服务人员信息
import saleWorkerShow from '@/pages/sale/saleWorkerShow.vue'//服务人员详情
import saleOwnWorkerList from '@/pages/sale/saleOwnWorkerList.vue'//由我创建的服务人员
import saleOwnClientList from '@/pages/sale/saleOwnClientList.vue'//我维护的客户

export const saleConfigModule = [
    {
        path: '/sale/saleWorkStation',
        name: 'saleWorkStation',
        component: saleWorkStation,
    },//门店工作台
    {
        path: '/sale/orderList',
        name: 'orderList',
        component: orderList,
    },//订单列表
    {
        path: '/sale/orderConfig',
        name: 'orderConfig',
        component: orderConfig,
    },//订单配置页
    {
        path: '/sale/saleSignPage',
        name: 'saleSignPage',
        component: saleSignPage,
    },//签约页面
    {
        path: '/sale/publicOrderList',
        name: 'publicOrderList',
        component: publicOrderList,
    },//公海订单列表
    {
        path: '/sale/publicOrderConfig',
        name: 'publicOrderConfig',
        component: publicOrderConfig,
    },//公海订单详情
    {
        path: '/sale/contractList',
        name: 'contractList',
        component: contractList,
    },//我的合同列表
    {
        path: '/sale/contractItem',
        name: 'contractItem',
        component: contractItem,
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
        path: '/sale/saleOwnWorkerList',
        name: 'saleOwnWorkerList',
        component: saleOwnWorkerList,
    },//由我创建的服务人员
    {
        path: '/sale/saleOwnClientList',
        name: 'saleOwnClientList',
        component: saleOwnClientList,
    },//我维护的客户
]