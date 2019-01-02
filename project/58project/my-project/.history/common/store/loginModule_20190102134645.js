
/**
 * created by sxw
 * vuex数据
 */


import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const loginModule = {
    state: {
        isLogin: false, //是否已经登录
        user: {},//用户信息
        token: null //存储的token
    }
}