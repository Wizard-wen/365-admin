import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

import orderRequest from '../service/request/orderRequest.js'
import { Message } from 'element-ui';
/**
 * 订单状态类型
 */
var order_type = [
    {
        label: '请选择',
        value: 0
    },
    {
        label: '待匹配',
        value: 1
    },
    {
        label: '已匹配',
        value: 2
    },
    {
        label: '已签约',
        value: 3
    },
    {
        label: '已取消',
        value: 4
    },
    {
        label: '订单完成',
        value: 5
    },
]

/**
 * 订单来源
 */
var order_source = [
    {
        label: "请选择",
        value: 0
    },
    {
        label: "线上",
        value: 1
    },
    {
        label: "线下",
        value: 2
    },
    {
        label: "渠道",
        value: 3
    },
]


export const orderModule = {
    state: {
        order: [],//订单基本信息
        order_staff: [],//待匹配服务人员
        order_files: [], //合同列表
        order_logs: [],//订单日志

        order_type: order_type,//订单状态类型
        order_source: order_source,//订单来源
    },
    mutations: {
        /**
         * 初始化shuju
         */
        configData(state, data){
            state.order = data.data.order
            state.order_staff = data.data.order_staff //候选人员
            state.order_files = data.data.order_files //合同信息
            state.order_logs = data.data.order_logs //订单日志
        }
    },
    actions: {
        async setData(context, order_id){
            await orderRequest.getOrder(order_id)
                .then(data =>{
                    context.commit('configData',data)
                })
                .catch(e =>{
                    Message({
                        type:'error',
                        message: e.message
                    })
                })

        }
    }
}



