
import {
    apiRequestStore,
} from '@/request/index'

import {
    getSaleWorkstationForm,
} from '@/pages/saleWorkStation/saleWorkStation'

export const saleWorkstationService = {
    getSaleWorkBench(getSaleWorkstationForm:getSaleWorkstationForm){
        return apiRequestStore.saleWorkBench(getSaleWorkstationForm)
    }
}