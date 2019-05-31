
/**
 * created by sxw
 * vuex数据
 */


import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
/**
 * 被持久化的信息
 */
export const loginModule = {
    state: {
        isLogin: false,//是否登录
        token: null,//存储token 
        user: {},//用户信息
    },
    mutations: {
        login(state, token){
            state.isLogin = true
            state.token = token
        },
        setUser(state, user){
            if(state.isLogin)
                state.user = user
        },
        logout(state){
            state.isLogin = false
            state.token = null
            state.user = {}
        },
    }
}