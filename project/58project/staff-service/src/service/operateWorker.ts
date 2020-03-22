import {
    apiRequestWorker,
    apiRequestFormConfig,
    apiRequestService,
    apiRequestCommon,
} from '@/request/index'

import {workerItem} from '@/pages/operateWorker/workerItem/IworkerItem'

import {workerConfigForm} from '@/pages/operateWorker/workerConfigForm/IworkerConfigForm'
import {$utils} from '@/utils/index'
import {
    searchWorkerForm,
    changeWorkerTypeForm,
    checkWorkerPhoneForm,
} from '@/public/module/workerList/IworkerList'

export const operateWorkerService = {
    /**
     * 请求列表数据
     */
    getWorkerList(queryObject:searchWorkerForm):Promise<any>{

        return  Promise.all([
            apiRequestFormConfig.getWorkerFormConfig('edit'), //获取表单配置字段
            apiRequestWorker.getStaffList(queryObject), //获取列表数据
            apiRequestService.getServiceTree() //服务商品树形
        ]).then(data =>{

            return {
                workerConfigForm: {
                    ...data[0].data,
                },
                pagination: {
                    currentPage: data[1].data.current_page, //当前页码
                    total: data[1].data.total, //列表总条数
                    pageNumber: data[1].data.per_page //每页显示数
                },
                workerTable: data[1].data.data
            }
        })
    },
    /**
     * 
     * @param type 查询类型  edit 使用 config 编辑
     */
    async getWorkerConfigForm(type:string):Promise<any>{
        return apiRequestFormConfig.getWorkerFormConfig(type)
    },
    /**
     * 获取服务人员信息
     * @param id 
     * @param workerConfigForm 
     */
    async getWorker(id:string, workerConfigForm:workerConfigForm):Promise<any>{
        let skillConfig = workerConfigForm.skill
        return apiRequestWorker.getStaff(id).then(data =>{
            if(data.code == "0"){

                var workerForm = data.data

                workerForm.skill = workerForm.skill.map((item:number) =>{
                    return $utils.setTreeArray(item,skillConfig)
                })
                if(workerForm.nation == 0){
                    workerForm.nation = ''
                }
                if(workerForm.education == 0){
                    workerForm.education = ''
                }
                if(workerForm.sex == 0){
                    workerForm.sex = ''
                }
                if(workerForm.zodiac_sign == 0){
                    workerForm.zodiac_sign = ''
                }

                return workerForm
            }
        })
    },
    /**
     * 编辑服务人员信息
     * @param workerForm 
     */
    async editWorker(workerForm:workerItem):Promise<any>{
        return apiRequestWorker.editStaff(workerForm)
    },

    /**
     * 检查服务人员手机号是否重复
     * @param checkWorkerPhoneForm 
     */
    checkNewWorkerPhone(checkWorkerPhoneForm:checkWorkerPhoneForm){
        return apiRequestWorker.checkStaffPhone(checkWorkerPhoneForm)
    },

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
     * 
     * @param type 
     */
    getPaperSelection(type:any){
        return apiRequestCommon.getPaperSelection(type)
    }
}







