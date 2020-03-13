
import {
    apiRequestOrder,
    apiRequestCommon
} from '@/request/index'
import {createOperateOrderForm} from '@/pages/operateOrder/createOrderPage/IcreateOrderPage.ts'
export const operateCreateOrderService = {
    /**
     * 运营创建订单
     */
    async operateCreateOrder(createOperateOrderForm:createOperateOrderForm):Promise<any>{
        return apiRequestOrder.createOrder(createOperateOrderForm)
    },
    /**
     * 获取门店所属员工数据
     */
    async getStoreManagerSelection(store_id:number):Promise<any>{
        return apiRequestCommon.getStoreManagerSelection(store_id)
    },
    /**
     * 获取门店数据
     */
    async getStoreSelection():Promise<any>{
        return apiRequestCommon.getStoreSelection()
    },
}