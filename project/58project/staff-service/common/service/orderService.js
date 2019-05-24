/**
 * 订单模块接口
 */

import orderRequest from './request/orderRequest.js'
import { Message } from 'element-ui';
export default {
    /**
     * 获取订单列表
     */
    getOrderList(tableOption){
        return orderRequest.getOrderList(tableOption)
    },
    /**
     * 获取所有销售人员名单
     */
    getManagerSelection(){
        return orderRequest.getManagerSelection()
    },
    /**
     * 创建订单
     * @param obj 新订单表单字段
     */
    createOrder(obj){
        return orderRequest.createOrder(obj) 
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
        return orderRequest.editOrder(obj)
    },
    /**
     * 添加候选人
     * @param obj 候选人字段信息
     * @param obj.order_id 订单id
     * @param obj.staff_id 服务人员id
     * @param obj.staff_name 服务人员姓名
     */
    createOrderStaff(obj){

        return orderRequest.createOrderStaff(obj)
    },
    /**
     * 删除候选人
     * @param order_staff_id 候选人员信息id
     * @param order_id 订单id
     */
    deleteOrderStaff(order_staff_id, order_id){
        return orderRequest.deleteOrderStaff(order_staff_id, order_id)
    },
    /**
     * 签约
     */
    sign(obj){
        return orderRequest.sign(obj)
    },
    /**
     * 日志信息提交
     * @param obj 
     * @param type 
     */
    logCommit(obj, type){
        //签约前、售后日志
        if(type == 'normal'){
            return orderRequest.writeOrderLog(obj)
        } 
        //拒绝日志
        else if(type == 'refuse'){
            return orderRequest.refuse(obj)
        } else {
            return 
        }
    },
    /**
     * 取消订单
     */ 
    cancelOrder(obj){
        return orderRequest.cancelOrder(obj)
    },
    /**
     * 完成订单
     */ 
    completeOrder(obj){
        return orderRequest.completeOrder(obj)
    },
    /**
     * 派发订单
     */
    assignOrder(obj){
        return orderRequest.assignOrder(obj)
    },
    /**
     * 申请创建服务人员
     */
    editStaffBySale(obj){
        return orderRequest.editStaffBySale(obj)
    },
    /**
     * 销售创建服务人员
     */
    createStaffBySeller(obj){
        return orderRequest.createStaffBySeller(obj)
    },
    /**
     * 销售创建服务人员
     */
    changeWorkingStatus(obj){
        return orderRequest.changeWorkingStatus(obj)
    }
}