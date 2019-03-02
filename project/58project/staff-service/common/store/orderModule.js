import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
         * 添加一条带匹配服务人员信息
         */
        addMatchService(state){
            let newid = state.matchList[state.matchList.length-1].id
            let obj = {
                id: ++ newid,
                name: '小罗伯特',
            };
            state.matchList.push(obj)
        },
        /**
         *  删除一条带匹配服务人员信息
         * @param {*} id 
         */
        deleteMatchService(state, id){
            state.matchList.forEach((item, index) =>{
                if(item.id == id){
                    state.matchList.splice(index,1)
                }
            })
        },
        /**
         * 
         */
        configData(state, data){
            state.order = data.data.order
            state.order_staff = data.data.order_staff //候选人员
            state.order_files = data.data.order_files //合同信息
            state.order_maintain_logs = data.data.order_maintain_logs //售后日志
            state.order_sign_logs = data.data.order_sign_logs  // 售前日志
        }
    }
}