
import {
    workerItem,
    addWorkerReturnMessageForm,
}from '@/pages/operateWorker/workerItem/IworkerItem'

import {
    searchWorkerForm,
    changeWorkerTypeForm,
    changeWorkerStatusForm,
    checkWorkerPhoneForm
}from '@/public/module/workerList/IworkerList'


import {
    getOperateWorkerStationForm
} from '@/pages/operateWorkStation/operateWorkstation'

export interface api_worker{
    getOperateWorkBench: {(getOperateWorkerStationForm:getOperateWorkerStationForm): Promise<any>},
    getStaffList:{(queryObject:searchWorkerForm):Promise<any>},//获取服务人员列表
    getStaff:{(id:string):Promise<any>},//获取服务人员
    editStaff:{(queryObject:workerItem):Promise<any>},//编辑服务人员
    checkStaffName:{(id:string,name:string):Promise<any>},//检测服务人员姓名是否重复
    checkStaffPhone:{(checkWorkerPhoneForm:checkWorkerPhoneForm):Promise<any>},//检测服务人员手机号是否重复
    changeStaffType:{(changeWorkerStatusForm:changeWorkerStatusForm):Promise<any>},

    addReturnLog:{(addWorkerReturnMessageForm:addWorkerReturnMessageForm):Promise<any>},

    deleteApplyStaff:{(id:string):Promise<any>},//删除申请添加服务人员
    agreeStaffSingle:{(changeWorkerTypeForm:changeWorkerTypeForm):Promise<any>},//提交新申请服务人员 / 恢复异常服务人员 / 导出回访人员
    createWorkerBySeller:{(obj:object):Promise<any>},//销售创建服务人员
    changeWorkingStatus:{(obj:object):Promise<any>}//修改服务人员接单状态
}
