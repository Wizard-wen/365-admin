/**
 * 处理全局的loading
 */


import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const loadingModule = {
    state: {
        
        //handleError函数引起的显示错误，如果该属性为true时候，则无视isShowError是否为false，显示错误提示
        isShowHandleError: false,
        isLoading: false,
    },
    mutations: {
        setLoading(state, loadingState){
            state.isLoading = loadingState
        }
    }
}