

import {
    apiRequestOrder,
    apiRequestFormConfig,
    apiRequestCommon,
} from '@/request/index.ts'

import {
    searchOrderItem,
    assignOrderForm,
} from '@/public/module/orderList/IorderList.ts'
import {searchContractForm} from '@/public/module/contractList/IcontractList.ts'
import { applyOrderObject } from '@/pages/sale/interface/order'
import {saleApplyOrderItem} from '@/public/module/orderList/control/saleApplyOrderBtn/saleApplyOrderItem'

export const saleService = {
    /**
     * 获取订单列表
     * @param orderQueryForm 
     */
    async getOrderList(orderQueryForm:searchOrderItem):Promise<any>{
        return Promise.all([
            apiRequestFormConfig.getOrderFormConfig(),
            apiRequestOrder.getOrderList(orderQueryForm)
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
    /**
     * 获取本门店员工
     */
    async getStoreManagerSelection(store_id:number):Promise<any>{
        return apiRequestCommon.getStoreManagerSelection(store_id)
    },
    /**
     * 店长分派订单
     * @param assignOrderForm 
     */
    async assignOrder(assignOrderForm:assignOrderForm):Promise<any>{
        return apiRequestOrder.assignOrder(assignOrderForm)
    },
    /**
     * 门店申请订单
     * @param saleApplyOrderItem 
     */
    async applyOrder(saleApplyOrderItem:saleApplyOrderItem):Promise<any>{
        return apiRequestOrder.applyOrder(saleApplyOrderItem)
    },
     /**
     * 请求合同列表
     */
    async getContractList(contractQueryForm:searchContractForm){

        return  Promise.all([
            apiRequestOrder.getContractList(contractQueryForm),
            apiRequestFormConfig.getOrderFormConfig()
        ]).then((data) =>{
            
            return {
                contractConfigForm: {
                    ...data[1].data,
                },
                pagination: {
                    currentPage: data[0].data.current_page, //当前页码
                    total: data[0].data.total, //列表总条数
                    pageNumber: data[0].data.per_page //每页显示数
                },
                contractTable: data[0].data.data
            }
        })
    },


}