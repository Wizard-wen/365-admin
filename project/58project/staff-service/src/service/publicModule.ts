

import {
    publicContractItemService,
    publicOrderApplyItemService,
    publicOrderConfigService,
    publicOrderListService,
    publicOrderPublicService,
    publicWorkerShowService,
    publicWorkerListService,
} from './publicModule/index'
import {apiRequestFormConfig} from '@/request/index'

export const publicModuleService = {
    ...publicContractItemService,
    ...publicOrderApplyItemService,
    ...publicOrderConfigService,
    ...publicOrderListService,
    ...publicOrderPublicService,
    ...publicWorkerShowService,
    ...publicWorkerListService,
    /**
     * 编辑服务人员标签信息配置
     */
    editWorkerFormConfig(obj:any){
        return apiRequestFormConfig.editWorkerFormConfig(obj)
    },
}




