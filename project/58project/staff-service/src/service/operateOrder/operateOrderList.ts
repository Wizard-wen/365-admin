import {
    apiRequestOrder,
    apiRequestFormConfig
} from '@/request/index'
import {searchOperateOrderForm} from '@/pages/operateOrder/operateOrderList/IoperateOrderList.ts'
export const operateOrderListService = {
    /**
     * 获取运用订单列表
     * @param searchOrderApplyForm 
     */
    async getOperateOrderList(searchOrderApplyForm:searchOperateOrderForm):Promise<any>{
        return Promise.all([
            apiRequestFormConfig.getOrderFormConfig(),
            apiRequestOrder.getOrderList(searchOrderApplyForm)
        ]).then(data =>{
            return {
                orderConfigForm: {
                    ...data[0].data,
                },
                pagination: {
                    currentPage: data[1].data.current_page, //当前页码
                    total: data[1].data.total, //列表总条数
                    pageNumber: data[1].data.per_page //每页显示数
                },
                orderTable: data[1].data.data
            }
        })
    },
}