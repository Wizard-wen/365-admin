

import {searchOrderApplyForm} from '@/pages/operateOrder/orderApplyList/IorderApplyList.ts'
import {searchClientRequireForm} from '@/pages/operateOrder/clientRequireList/IclientRequireList.ts'
import {clientRequireItem} from '@/pages/operateOrder/clientRequireItem/IclientRequireItem.ts'
import {orderApplyItem} from '@/pages/operateOrder/orderApplyItem/IorderApplyItem.ts'


import {apiRequestOrder} from '@/request/order/index.ts'
import { apiRequestFormConfig } from '@/request'

export const operateOrderService = {
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
    /**
     * 处理门店订单申请
     * @param orderApplyItem 
     */
    async dealOrderApply(orderApplyItem:orderApplyItem):Promise<any>{
        return apiRequestOrder.dealApplication(orderApplyItem)
    },
    /**
     * 处理客户端订单申请
     * @param clientRequireItem 
     */
    async dealClientApply(clientRequireItem:clientRequireItem):Promise<any>{
        return apiRequestOrder.dealApplication(clientRequireItem)
    },
}