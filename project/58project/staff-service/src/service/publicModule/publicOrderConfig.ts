import {
    apiRequestOrder, apiRequestCommon,apiRequestWorker
} from '@/request/index.ts'


import {
    deleteMatchedWorkerForm,
    refuseMatchedWorkerForm,
    determinateOrderForm,
    assignStoreOrderForm,
} from '@/public/module/orderConfig/IorderItem'
export const publicOrderConfigService = {
    /**
     * 删除候选人
     * @param order_staff_id 候s选人员信息id
     * @param order_id 订单id
     */
    deleteMatchedWorker(deleteMatchedWorkerForm:deleteMatchedWorkerForm){
        return apiRequestOrder.deleteOrderStaff(deleteMatchedWorkerForm)
    },
    /**
     * 拒签
     * @param refuseObj
     */
    refuseMatchedWorker(refuseMatchedWorkerForm:refuseMatchedWorkerForm){
        return apiRequestOrder.refuse(refuseMatchedWorkerForm)
    },
    /**
     * 终止订单
     * @param determinateOrderForm 
     */
    terminateOrder(determinateOrderForm:determinateOrderForm){
        return apiRequestOrder.cancelOrder(determinateOrderForm)
    },
    /**
     * 店长分派订单
     * @param assignStoreOrderForm 
     */
    assignOrderInStore(assignStoreOrderForm:assignStoreOrderForm){
        return apiRequestOrder.assignOrder(assignStoreOrderForm)
    },
    /**
     * 获取门店内员工
     * @param store_id 
     */
    getStoreManagerSelection(store_id:number){
        return apiRequestCommon.getStoreManagerSelection(store_id)
    },
    /**
     * 获取劳动者
     * @param id 
     */
    async getWorker(id:string){
        return apiRequestWorker.getStaff(id)
    },
}