
import {
    apiRequestStore,
} from '@/request/index'

import {
    getSaleWorkstationForm,
} from '@/pages/saleWorkStation/saleWorkStation'
import {$utils} from '@/utils/index'
export const saleWorkstationService = {
    getSaleWorkBench(getSaleWorkstationForm:getSaleWorkstationForm){
        let queryUrl = $utils.changeObjectToPathString(getSaleWorkstationForm)
        return apiRequestStore.saleWorkBench(queryUrl)
    },
    getHalfYearData(){
        return apiRequestStore.getHalfYearData() 
    }
}