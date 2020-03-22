
/**
 * created by sxw
 * vuex数据
 */


import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const authModule = {
    state: {
        departmentList: [
            {id:0,name:'全部'},
            {id:1,name:'办公室'},
            {id:2,name:'运营中心'},
            {id:3,name:'培训部'},
            {id:4,name:'门店'},
            {id:5,name:'开发部'}
        ]
    },
    mutations: {
    }
}