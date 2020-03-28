/**
 * 公司内部员工
 */


import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//门店是直营店还是加盟店
export const is_thirdList = [
    {name: '直营店', id: 1},
    {name: '加盟店', id: 2},
]

//门店经营状态
export const runTypeList = [
    { id: 1, name: "营业" }, 
    { id: 2, name: "停业" }
]
//门店员工职位
export const positionTypeList = [{id: 1, name: '店员'}, {id: 2, name: '店长'}]


export const storeModule = {
    state: {
        //门店查询参数
        storeList: {
            is_third: [],
            type: [],
            name: '',
            store_manager_name: '',
            store_code: '',
        },
        //门店查询字段配置对象
        storeFormConfig: {
            is_third: is_thirdList,
            type: runTypeList,
        }
    },
    mutations: {
        //设置门店查询参数
        setStoreList(state,payload){
            state.storeList[payload.queryKey] = payload.queryedList
        },
    }   
}