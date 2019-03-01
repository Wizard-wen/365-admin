import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const orderModule = {
    state: {
        //带匹配服务人员
        matchList: [{
            id: 0,
            name: '宋0',
        },{
            id: 1,
            name: '宋1',
        },{
            id: 2,
            name: '宋2',
        },{
            id: 3,
            name: '宋3',
        },]
    },
    mutations: {
        /**
         * 添加一条带匹配服务人员信息
         */
        addMatchService(state, ){
            
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
        }
    }
}