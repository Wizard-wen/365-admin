import {
    apiRequestOrder,
} from '@/request/index'


export const clientRequireItemService = {
    /**
     * 获取客户需求
     * @param id 
     */
    async getClientRequire(id:number){
        return apiRequestOrder.getClientRequire(id)
    },
}