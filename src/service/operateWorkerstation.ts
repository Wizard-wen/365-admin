import {
    apiRequestWorker
} from '@/request/index'
import {
    getOperateWorkerStationForm
} from '@/pages/operateWorkStation/operateWorkstation'
export const operateWorkerStationService = {
    getOperateWorkerStation(getOperateWorkerStationForm:getOperateWorkerStationForm){
        return apiRequestWorker.getOperateWorkBench(getOperateWorkerStationForm)
    }
}