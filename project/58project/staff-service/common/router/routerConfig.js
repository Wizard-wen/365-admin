

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

/**
 * 销售门店模块
 */
import saleWorkStation from '@/pages/sale/saleWorkStation.vue'//门店工作台
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

const saleModule = [
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

/**
 * 门店管理
 */
import storeList from '@/pages/store/storeList.vue'
import storeItem from '@/pages/store/storeItem.vue'
import storeEdit from '@/pages/store/storeEdit.vue'

const store = [
    {
        path: '/store/storeList',
        name: 'storeList',
        component: storeList,
    },
    {
        path: '/store/storeItem',
        name: 'storeItem',
        component: storeItem,
    },
    {
        path: '/store/storeEdit',
        name: 'storeEdit',
        component: storeEdit,
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
    ...store,//门店管理
    ...student,//学员管理
]
