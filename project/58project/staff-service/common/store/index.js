
import Vue from 'vue'
import vuex from 'vuex'
/**
 * vuex-persistedstate vuex持久化
 */
import createPersistedState from 'vuex-persistedstate'

import {loginModule} from './loginModule.js'
import {loadingModule} from './loadingModule.js'
import {orderModule} from './orderModule.js'

Vue.use(vuex);

window.store = new vuex.Store({
    //保存
    modules: {
        loginModule,
        loadingModule,
        orderModule
    },
    plugins: [createPersistedState({
        key: 'staff',
        storage: window.sessionStorage,
        reducer(val) {
            return {
            // 只储存state中的user
            loginModule: val.loginModule
          }
       }
    })]
})


export default store