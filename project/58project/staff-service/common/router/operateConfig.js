/**
 * 运营中心模块路由
 */


/**
 * 运营---工作台
 */
import operateWorkStation from '@/pages/operate/operateWorkStation.vue'

/**
 * 运营---订单管理
 */
import operateOrderList from '@/pages/operate/order/orderList.vue'
import operateOrderConfig from '@/pages/operate/order/orderConfig.vue'
import operateOrderApplyList from '@/pages/operate/order/orderApplyList.vue'
import operateOrderApplyItem from '@/pages/operate/order/orderApplyItem.vue'
 
/**
 * 运营---合同管理
 */
import operateVoidContractList from '@/pages/operate/contract/voidContractList.vue'
import operateContractList from '@/pages/operate/contract/contractList.vue'
import operateContractItem from '@/pages/operate/contract/contractItem.vue'

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
import workerList from '@/pages/operate/worker/workerList.vue'
import workerFormConfig from '@/pages/operate/worker/workerFormConfig.vue'
import workerItem from '@/pages/operate/worker/workerItem.vue'
import workerItemShow from '@/pages/operate/worker/workerItemShow.vue'
import newWorkerList from '@/pages/operate/worker/newWorkerList.vue'
import errorWorkerList from '@/pages/operate/worker/errorWorkerList.vue'
import returnWorkerList from '@/pages/operate/worker/returnWorkerList.vue'
 
 
export const operateConfigModule = [
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
        path: '/operate/operateOrderConfig',
        name: 'operateOrderConfig',
        component: operateOrderConfig,
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
        path: '/operate/contract/operateVoidContractList',
        name: 'operateVoidContractList',
        component: operateVoidContractList,
    },
    {
        path: '/operate/contract/operateContractList',
        name: 'operateContractList',
        component: operateContractList,
    },
    {
        path: '/operate/contract/operateContractItem',
        name: 'operateContractItem',
        component: operateContractItem,
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
        path: '/worker/workerFormConfig',
        name: 'workerFormConfig',
        component: workerFormConfig,
    },
    {
        path: '/worker/returnWorkerList',
        name: 'returnWorkerList',
        component: returnWorkerList,
    },
]