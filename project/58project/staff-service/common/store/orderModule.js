import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

import orderRequest from '../service/request/orderRequest.js'
import { Message } from 'element-ui';
export const orderModule = {
    state: {
        order: [],//订单基本信息
        order_staff: [],//待匹配服务人员
        order_files: [], //合同列表
        order_maintain_logs: [],//售后日志
        order_sign_logs: [],//售前日志
    },
    mutations: {
        /**
         * 初始化shuju
         */
        configData(state, data){
            state.order = data.data.order
            state.order_staff = data.data.order_staff //候选人员
            state.order_files = data.data.order_files //合同信息
            state.order_maintain_logs = data.data.order_maintain_logs //售后日志
            state.order_sign_logs = data.data.order_sign_logs  // 售前日志
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