
import {
    apiRequestStore,
} from '@/request/index'

import {
    getSaleWorkstationForm,
} from '@/pages/saleWorkStation/saleWorkstation'

export const saleWorkstationService = {
    getSaleWorkBench(getSaleWorkstationForm:getSaleWorkstationForm){
        return apiRequestStore.saleWorkBench(getSaleWorkstationForm)
    }
}