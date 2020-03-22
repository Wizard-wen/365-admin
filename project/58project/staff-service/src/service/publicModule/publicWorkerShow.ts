import {
    apiRequestWorker,
    apiRequestFormConfig,
} from '@/request/index'
import {workerConfigForm} from '@/pages/operateWorker/workerConfigForm/IworkerConfigForm'

import {$utils} from '@/utils/index'
export const publicWorkerShowService = {

    /**
     * 获取服务人员信息
     * @param id 
     * @param workerConfigForm 
     */
    async getPublicWorkerShow(id:string, workerConfigForm:workerConfigForm):Promise<any>{
        let skillConfig = workerConfigForm.skill
        return apiRequestWorker.getStaff(id).then(data =>{
            if(data.code == "0"){

                var workerForm = data.data
                workerForm.skill = workerForm.skill.map((item:number) =>{
                    return $utils.setTreeArray(item,skillConfig)
                })

                return workerForm
            }
        })
    },

    getPublicWorkerConfigForm(type:string){
        return apiRequestFormConfig.getWorkerFormConfig(type)
    },

}
