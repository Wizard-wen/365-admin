import {
    apiRequestOrder,
} from '@/request/index'
export const saleContractItemService = {
    /**
     * 
     */
    async getSaleContract(id:number){
        return apiRequestOrder.getContract(id)
    }, 
}