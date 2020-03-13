import {
    apiRequestOrder,
} from '@/request/index'

export const salePublicOrderConfigService = {
    /**
     * 获取门店订单数据
     * @param id 
     */
    async getSalePublicOrder(id:number):Promise<any>{
        return apiRequestOrder.getOrder(id).then(data =>{
            return {
                orderBase: data.data.order,
                order_staff: data.data.order_staff,
                order_contract:data.data.order_contract,
                order_logs:data.data.order_logs,
            }  
        })
    },
}