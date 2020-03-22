
import {
    apiRequestOrder,
    apiRequestCommon,
} from '@/request/index'

export const orderApplyItemService = {
    /**
     * 获取订单门店申请
     * @param id 
     */
    async getApplication(id:number){
        return apiRequestOrder.getApplication(id)
    },
    /**
     * 
     * @param orderOriginForm 
     */
    editAppLySource(orderOriginForm:any){
        return apiRequestOrder.editAppLySource(orderOriginForm)
    },
    /**
     * 
     */
    getStoreSelection(){
        return apiRequestCommon.getStoreSelection()
    },
    /**
     * 
     * @param store_id 
     */
    getStoreManagerSelection(store_id:any){
        return apiRequestCommon.getStoreManagerSelection(store_id)
    }
}