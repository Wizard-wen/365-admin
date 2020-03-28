

import {apiRequestOrder, apiRequestCommon, apiRequestFormConfig} from '@/request/index'
import {
    editClientRequireForm,
    editStoreApplicationForm,
    editOrderConfigBaseForm,
    changeFieldForm,
} from '@/public/module/orderPublic/IorderPublic'

import {$utils} from '@/utils/index'
export const publicOrderPublicService = {
    /**
     * 编辑客户需求订单字段
     * @param editClientRequireForm 
     */
    editClientRequireField(editClientRequireForm:editClientRequireForm){
        return apiRequestOrder.editClientRequire(editClientRequireForm)
    },
    /**
     * 编辑门店订单申请字段
     * @param editStoreApplicationForm 
     */
    editStoreApplicationField(editStoreApplicationForm:editStoreApplicationForm){
        return apiRequestOrder.editApplication(editStoreApplicationForm)
    },
    /**
     * 编辑门店订单字段
     * @param editOrderConfigBaseForm 
     */
    editOrderConfigBaseField(editOrderConfigBaseForm:editOrderConfigBaseForm){
        return apiRequestOrder.editOrder(editOrderConfigBaseForm)
    },
    /**
     * 获得
     */
    async getOrderConfigBaseField(originSkill:number){
        let configData = {
            skill: [],
        }
        await apiRequestFormConfig.getWorkerFormConfig('edit').then(data => {
            configData = data.data
        })

        return Promise.resolve($utils.setTreeArray(originSkill,configData.skill))
    },
    /**
     * 获取门店员工
     * @param store_id 
     */
    getStoreManagerSelection(store_id:number){
        return apiRequestCommon.getStoreManagerSelection(store_id)
    },
    /**
     * 获取门店
     */
    getStoreSelection(){
        return apiRequestCommon.getStoreSelection()
    },
    /**
     * 修改公共订单基本信息字段
     * @param publicOrderType 
     * @param changeFieldForm 
     */
    editPublicOrderBaseField(publicOrderType:number, changeFieldForm:changeFieldForm):Promise<any>{
        if(publicOrderType == 1){
            return apiRequestOrder.editApplication(changeFieldForm)
        } else if(publicOrderType == 2){
            return apiRequestOrder.editClientRequire(changeFieldForm)
        } else if(publicOrderType == 3){
            return apiRequestOrder.editOrder(changeFieldForm)
        } else {
            return Promise.resolve()
        }
    },
    assignOrder(operateAssignOrderForm:any){
        return apiRequestOrder.assignOrder(operateAssignOrderForm)
    }
}

