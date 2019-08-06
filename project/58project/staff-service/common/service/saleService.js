/**
 * 订单模块接口
 */

import saleRequest from './request/saleRequest.js'
import { Message } from 'element-ui';
export default {
    /**
     * 获取门店员工信息
     * @param id 门店id
     */
    getStoreManagerSelection(id){
        return saleRequest.getStoreManagerSelection(id)
    },
    /**
     * 订单申请
     * @param applyObject 订单申请字段
     */
    applyOrder(applyObject){
        return saleRequest.applyOrder(applyObject)
    },
















    /**
     * 获取订单列表
     */
    getOrderList(tableOption){
        return saleRequest.getOrderList(tableOption)
    },
    /**
     * 获取所有销售人员名单
     */
    getManagerSelection(){
        return saleRequest.getManagerSelection()
    },
    /**
     * 创建订单
     * @param obj 新订单表单字段
     */
    createOrder(obj){
        return saleRequest.createOrder(obj) 
    },
    /**
     * 获取订单信息
     * @param order_id 订单id
     */
    async getOrder(order_id){
        await store.dispatch('setData', order_id)
    },
    /**
     * 编辑订单
     * @param obj 编辑表单字段
     */
    editOrder(obj){
        return saleRequest.editOrder(obj)
    },
    /**
     * 添加候选人
     * @param obj 候选人字段信息
     * @param obj.order_id 订单id
     * @param obj.staff_id 服务人员id
     * @param obj.staff_name 服务人员姓名
     */
    createOrderStaff(obj){

        return saleRequest.createOrderStaff(obj)
    },
    /**
     * 删除候选人
     * @param order_staff_id 候选人员信息id
     * @param order_id 订单id
     */
    deleteOrderStaff(order_staff_id, order_id){
        return saleRequest.deleteOrderStaff(order_staff_id, order_id)
    },
    /**
     * 签约
     */
    sign(obj){
        return saleRequest.sign(obj)
    },
    /**
     * 日志信息提交
     * @param obj 
     * @param type 
     */
    logCommit(obj, type){
        //签约前、售后日志
        if(type == 'normal'){
            return saleRequest.writeOrderLog(obj)
        } 
        //拒绝日志
        else if(type == 'refuse'){
            return saleRequest.refuse(obj)
        } else {
            return 
        }
    },
    /**
     * 取消订单
     */ 
    cancelOrder(obj){
        return saleRequest.cancelOrder(obj)
    },
    /**
     * 完成订单
     */ 
    completeOrder(obj){
        return saleRequest.completeOrder(obj)
    },
    /**
     * 派发订单
     */
    assignOrder(obj){
        return saleRequest.assignOrder(obj)
    },

    
    /**
     * 销售创建服务人员
     */
    createStaffBySeller(obj){
        return saleRequest.createStaffBySeller(obj)
    },
    /**
     * 销售创建服务人员
     */
    changeWorkingStatus(obj){
        return saleRequest.changeWorkingStatus(obj)
    }
}