import {
    apiRequestOrder,
    apiRequestWorker,
    apiRequestFormConfig,
} from '@/request/index'

import {
    searchSaleWorkerForm,
} from '@/pages/sale/saleWorkerList/IsaleWorkerList'
export const saleOrderConfigService = {
    /**
     * 获取门店订单数据
     * @param id 
     */
    async getSaleOrder(id:number):Promise<any>{
        return apiRequestOrder.getOrder(id).then(data =>{
            return {
                order: data.data.order,
                order_staff: data.data.order_staff,
                order_contract:data.data.order_contract,
                order_logs:data.data.order_logs,
            }  
        })
    },
    /**
     * 请求订单配置备选服务人员数据
     */
    getSaleOrderConfigMatchWorkerList(type:string, queryObject:searchSaleWorkerForm):Promise<any>{

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