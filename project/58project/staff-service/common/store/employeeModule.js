/**
 * 公司内部员工
 */


import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const employeeModule = {
    state: {
        //部门管理
        departmentList:[
            {
                label: '全部',
                id: 0,
            },
            {
                label: '销售部',
                id: 1,
            },
            {
                label: '开发部',
                id: 2,
            },
            {
                label: '人事部',
                id: 3,
            },
            {
                label: '运营部',
                id: 4,
            },
            {
                label: '培训部',
                id: 5,
            },
        ]
    },
    mutations: {

    }
}