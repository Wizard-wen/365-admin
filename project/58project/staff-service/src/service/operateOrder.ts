

// import {searchOrderApplyForm} from '@/pages/operateOrder/orderApplyList/IorderApplyList.ts'
// import {searchClientRequireForm} from '@/pages/operateOrder/clientRequireList/IclientRequireList.ts'
// import {clientRequireItem} from '@/pages/operateOrder/clientRequireItem/IclientRequireItem.ts'
// import {orderApplyItem} from '@/pages/operateOrder/orderApplyItem/IorderApplyItem.ts'
// import {searchOperateOrderForm} from '@/pages/operateOrder/operateOrderList/IoperateOrderList.ts'
// import {operateOrderItem} from '@/pages/operateOrder/operateOrderConfig/IoperateOrderConfig.ts'
// import {createOperateOrderForm} from '@/pages/operateOrder/createOrderPage/IcreateOrderPage.ts'

// import {apiRequestCommon} from '@/request/common/index.ts'
// import {apiRequestOrder} from '@/request/order/index.ts'
// import { apiRequestFormConfig } from '@/request/formConfig/index.ts'
import {
    clientRequireItemService,
    clientRequireListService,
    orderApplyItemService,
    orderApplyListService,
    operateCreateOrderService,
    operateOrderConfigService,
    operateOrderListService,
} from './operateOrder/index'


export const operateOrderService = {
    
    // /**
    //  * 处理门店订单申请
    //  * @param orderApplyItem 
    //  */
    // async dealOrderApply(orderApplyItem:orderApplyItem):Promise<any>{
    //     return apiRequestOrder.dealApplication(orderApplyItem)
    // },
    // /**
    //  * 处理客户端订单申请
    //  * @param clientRequireItem 
    //  */
    // async dealClientApply(clientRequireItem:clientRequireItem):Promise<any>{
    //     return apiRequestOrder.changeRequireType(clientRequireItem)
    // },
    ...orderApplyListService,
    ...clientRequireListService,
    ...clientRequireItemService,
    ...orderApplyItemService,
    ...operateCreateOrderService,
    ...operateOrderConfigService,
    ...operateOrderListService,
}




