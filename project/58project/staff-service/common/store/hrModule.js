/**
 * 处理全局的loading
 */


import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const hrModule = {
    state: {
       educationList: [
            {
                id : 0,
                name: "全部"
            },
            {
                id : 1,
                name: "博士"
            },
            {
                id : 2,
                name: "硕士"
            },
            {
                id : 3,
                name: "本科"
            },
            {
                id : 4,
                name: "大专"
            },
            {
                id : 5,
                name: "中专"
            },
            {
                id : 6,
                name: "高中"
            },
            {
                id : 7,
                name: "初中"
            },
            {
                id : 8,
                name: "小学"
            },
       ]
    },
}

