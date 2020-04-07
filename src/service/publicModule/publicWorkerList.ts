import {
    apiRequestWorker,
    apiRequestOrder,
    apiRequestFormConfig,
} from '@/request/index'
import {
    changeWorkerTypeForm,
    createWorkerBySellerForm,
    errorWorkerForm,
    addWorkerToMatchedWorkListForm,
    changeWorkerStatusForm,
    checkWorkerPhoneForm,
} from '@/public/module/workerList/IworkerList.ts'
export const publicWorkerListService = {
    /**
     * 将新服务人员添加至服务人员信息库
     * @param changeWorkerTypeForm 
     */
    addNewWorkerToWorkerList(changeWorkerTypeForm:changeWorkerTypeForm){    
        return apiRequestWorker.agreeStaffSingle(changeWorkerTypeForm)
    },
    /**
     * 恢复异常服务人员至服务人员信息库
     */
    recoverErrorWorkerToWorkerList(changeWorkerTypeForm:changeWorkerTypeForm){
        return apiRequestWorker.agreeStaffSingle(changeWorkerTypeForm)
    },
    /**
     * 门店创建服务人员
     */
    createWorkerBySeller(createWorkerBySellerForm:createWorkerBySellerForm){
        return apiRequestWorker.createWorkerBySeller(createWorkerBySellerForm)
    },
    /**
     * 将服务人员转至异常
     * @param errorWorkerForm 
     */
    addWorkerToErrorWorkerList(errorWorkerForm:errorWorkerForm){
        return apiRequestWorker.changeWorkingStatus(errorWorkerForm)
    },
    /**
     * 将服务人员添加至备选服务人员
     * @param addWorkerToMatchedWorkListForm 
     */
    addWorkerToMatchedWorkerList(addWorkerToMatchedWorkListForm:addWorkerToMatchedWorkListForm){
        return apiRequestOrder.createOrderStaff(addWorkerToMatchedWorkListForm)
    },
    /**
     * 停用、启用服务人员
     */
    changeWorkerType(changeWorkerStatusForm:changeWorkerStatusForm){
        return apiRequestWorker.changeStaffType(changeWorkerStatusForm)
    },
    /**
     * 检查服务人员手机号是否重复
     * @param checkWorkerPhoneForm 
     */
    checkNewWorkerPhone(checkWorkerPhoneForm:checkWorkerPhoneForm){
        return apiRequestWorker.checkStaffPhone(checkWorkerPhoneForm)
    },
    /**
     * 
     * @param type 查询类型  edit 使用 config 编辑
     */
    async getWorkerConfigForm(type:string):Promise<any>{
        return apiRequestFormConfig.getWorkerFormConfig(type)
    },
}