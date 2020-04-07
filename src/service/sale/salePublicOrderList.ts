import {
    apiRequestOrder,
    apiRequestFormConfig,
} from '@/request/index'
import {searchSalePublicOrderForm} from '@/pages/sale/salePublicOrderList/IsalePublicOrderList'
export const salePublicOrderListService = {
    /**
     * 获取订单列表
     * @param orderQueryForm 
     */
    async getSalePublicOrderList(orderQueryForm:searchSalePublicOrderForm):Promise<any>{
        return Promise.all([
            apiRequestFormConfig.getOrderFormConfig(),
            apiRequestOrder.getOrderList(orderQueryForm),
            apiRequestFormConfig.getWorkerFormConfig('edit'),
        ]).then(data =>{
            return {
                orderConfigForm: {
                    ...data[0].data,
                    ...data[2].data,
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