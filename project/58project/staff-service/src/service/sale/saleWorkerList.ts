
import {
    apiRequestWorker,
    apiRequestFormConfig,
} from '@/request/index'
import {
    searchSaleWorkerForm,
} from '@/pages/sale/saleWorkerList/IsaleWorkerList'
export const saleWorkerListService = {
    /**
     * 请求列表数据
     */
    getSaleWorkerList(type:string, queryObject:searchSaleWorkerForm):Promise<any>{

        return  Promise.all([
            apiRequestFormConfig.getWorkerFormConfig(type), //获取表单配置字段
            apiRequestWorker.getStaffList(queryObject), //获取列表数据
        ]).then(data =>{

            return {
                workerConfigForm: {
                    ...data[0].data,
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