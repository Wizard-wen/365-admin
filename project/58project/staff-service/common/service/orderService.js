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
     * 创建订单
     * @param obj 新订单表单字段
     */
    createOrder(obj){
        return orderRequest.createOrder(obj) 
    },
    /**
     * 获取订单信息
     */
    async getOrder(id){
        await orderRequest.getOrder(id) 
            .then(data =>{
                store.dispatch('setData', {data})
            })
            .catch(e =>{
                Message({
                    type:'error',
                    message: e.message
                })
            })
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
     * @param id 候选人id
     */
    deleteOrderStaff(id){
        return orderRequest.deleteOrderStaff(id)
    },
    /**
     * 签约
     */
    sign(obj){
        return orderRequest.sign(obj)
    },
    /**
     * 拒签
     */
    refuse(obj){
        return orderRequest.refuse(obj)
    },
    /**
     * 签约日志
     */
    writeSignLog(obj){
        return orderRequest.writeSignLog(obj)
    }
}