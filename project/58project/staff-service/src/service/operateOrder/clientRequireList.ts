
import {
    apiRequestOrder,
    apiRequestFormConfig,
} from '@/request/index'
import {searchClientRequireForm} from '@/pages/operateOrder/clientRequireList/IclientRequireList.ts'

export const clientRequireListService = {
    /**
     * 获取客户需求列表
     * @param searchClientRequireForm 
     */
    async getClientRequireList(searchClientRequireForm:searchClientRequireForm):Promise<any>{
        return Promise.all([
            apiRequestOrder.getClientRequireList(searchClientRequireForm),
            apiRequestFormConfig.getApplyFormConfig()
        ]).then(data =>{
            return {
                orderApplyConfigForm: {
                    ...data[1].data,
                },
                pagination: {
                    currentPage: data[0].data.current_page, //当前页码
                    total: data[0].data.total, //列表总条数
                    pageNumber: data[0].data.per_page //每页显示数
                },
                clientRequireTable: data[0].data.data
            }  
        })
    },
}