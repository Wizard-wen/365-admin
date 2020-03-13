

import {
    publicContractItemService,
    publicOrderApplyItemService,
    publicOrderConfigService,
    publicOrderListService,
    publicOrderPublicService,
    publicWorkerShowService,
    publicWorkerListService,
} from './publicModule/index'


export const publicModuleService = {
    ...publicContractItemService,
    ...publicOrderApplyItemService,
    ...publicOrderConfigService,
    ...publicOrderListService,
    ...publicOrderPublicService,
    ...publicWorkerShowService,
    ...publicWorkerListService,
}




