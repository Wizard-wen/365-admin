import {
    apiRequestWorker,
    apiRequestCommon,
    apiRequestFormConfig,
    apiRequestService,
} from '../request/index'

import {
    workerItem,
} from '../../src/pages/operateWorker/workerItem/IworkerItem'

import {
    searchWorkerItem,
} from '../../src/pages/operateWorker/workerList/IworkerList'

export const operateWorkerService = {
    /**
     * 请求列表数据
     */
    getTableList(type:string, queryObject:searchWorkerItem):Promise<any>{

        return  Promise.all([
            apiRequestFormConfig.getWorkerFormConfig(type), //获取表单配置字段
            apiRequestWorker.getStaffList(queryObject), //获取列表数据
            apiRequestService.getServiceTree() //服务商品树形
        ]).then(data =>{

            return {
                workerConfigForm: {
                    ...data[0].data,
                    serviceConfig: data[2].data
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
}