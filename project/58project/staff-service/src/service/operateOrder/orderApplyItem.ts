
import {
    apiRequestOrder,
} from '@/request/index'

export const orderApplyItemService = {
    /**
     * 获取订单门店申请
     * @param id 
     */
    async getApplication(id:number){
        return apiRequestOrder.getApplication(id)
    },
}