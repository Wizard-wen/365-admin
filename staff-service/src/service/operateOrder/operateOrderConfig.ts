
import {
    apiRequestOrder,
} from '@/request/index'

export const operateOrderConfigService = {
    /**
     * 获取运营订单数据
     * @param id 
     */
    async getOperateOrder(id:number):Promise<any>{
        return apiRequestOrder.getOrder(id).then(data =>{
            return {
                order: data.data.order,
                order_staff: data.data.order_staff,
                order_contract:data.data.order_contract,
                order_logs:data.data.order_logs,
            }  
        })
    },
}