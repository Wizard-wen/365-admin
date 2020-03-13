
import {
    apiRequestOrder,
    apiRequestFormConfig,
} from '@/request/index'
import {searchOrderApplyForm} from '@/pages/operateOrder/orderApplyList/IorderApplyList.ts'

export const orderApplyListService = {
    /**
     * 获取订单申请列表
     * @param searchOrderApplyForm 
     */
    async getOrderApplyList(searchOrderApplyForm:searchOrderApplyForm):Promise<any>{
        return Promise.all([
            apiRequestOrder.getApplicationList(searchOrderApplyForm),
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
                orderApplyTable: data[0].data.data
            }  
        })
    },
}