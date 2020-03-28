import {
    apiRequestOrder,
    apiRequestWorker,
    apiRequestFormConfig,
} from '@/request/index'

import {saleSignForm} from '@/pages/sale/saleSignPage/IsaleSignItem'

export const saleSignPageService = {
    /**
     * 签约
     */
    async sign(signItem:saleSignForm){
        return apiRequestOrder.sign(signItem)
    },
    /**
     * 获取当前门店员工空合同
     */
    async getManagerVoidContractSelection(){
        return apiRequestOrder.getManagerVoidContractSelection()
    },
    /**
     * 获取服务人员信息
     * @param id 
     */
    async getWorker(id:string){
        return apiRequestWorker.getStaff(id)
    },
    /**
     * 获取员工
     * @param type 
     */
    getWorkerFormConfig(type:string){
        return apiRequestFormConfig.getWorkerFormConfig(type)
    }

}