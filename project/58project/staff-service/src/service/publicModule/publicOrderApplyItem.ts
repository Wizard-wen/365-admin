

import {
    apiRequestOrder,
} from '@/request/index.ts'

import {
    dealOrderApplyForm,//处理订单需求接口
} from '@/public/module/orderApplyItem/IorderApplyItem.ts'


export const publicOrderApplyItemService =  {
    /**
     * 处理客户订单需求
     * @param clientRequireForm 
     */
    dealClientRequire(clientRequireForm:dealOrderApplyForm){
        return apiRequestOrder.changeRequireType(clientRequireForm)
    },
    /**
     * 处理门店订单需求
     * @param storeApplicationForm 
     */
    dealStoreApplication(storeApplicationForm:dealOrderApplyForm){
        return apiRequestOrder.dealApplication(storeApplicationForm)
    }
}