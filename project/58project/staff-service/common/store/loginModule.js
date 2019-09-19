
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
        user: {
            store_id: '',//关联分店id
            store_name: '',//关联分店名
            department_id: '',//关联部门id
            account: '',//账号
            clear_password: '',//明文密码
            name: '',//姓名
            access_token: '',
            refresh_token: '',
            expire: '',//过期时间
            is_administrator: '',//是否为超级管理员
            type: '',//状态
            real_name: '',//真实姓名
            phone: '',//电话
            wechat: '',//微信

        },//用户信息
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