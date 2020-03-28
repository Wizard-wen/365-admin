
import {
    apiRequestOrder
} from '@/request/index'

import {
    settleContractForm,
    terminateContractForm
} from '@/public/module/contractItem/IcontractItem'

export const publicContractItemService  = {
    /**
     * 终止合同
     * @param terminateContractForm
     */
    stopContract(terminateContractForm:terminateContractForm){
        return apiRequestOrder.stopContract(terminateContractForm)
    },
    /**
     * 结算工资
     * @param settleContractForm
     */
    settleWage(settleContractForm:settleContractForm){
        return apiRequestOrder.settleWage(settleContractForm)
    }
}