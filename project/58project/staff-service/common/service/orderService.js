/**
 * 订单模块接口
 */

import orderRequest from './request/orderRequest.js'

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
        try{
            await orderRequest.getOrder(id) 
                .then(data =>{
                    store.commit('configData', data)
                })
        }catch(err){
            throw err
        }   
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
     */
    saveOrderStaff(obj){
        return orderRequest.saveOrderStaff(obj)
    },
    /**
     * 删除候选人
     * @param obj 候选人字段信息
     */
    deleteOrderStaff(obj){
        return orderRequest.deleteOrderStaff(obj)
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