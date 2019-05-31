
import Vue from 'vue'
import vuex from 'vuex'
/**
 * vuex-persistedstate vuex持久化
 */
import createPersistedState from 'vuex-persistedstate'

import {loginModule} from './loginModule.js'
import {loadingModule} from './loadingModule.js'
import {orderModule} from './orderModule.js'
import {hrModule} from './hrModule.js'
import {shopModule} from './shopModule.js' //门店
import {authModule} from './authModule.js' 

Vue.use(vuex);

window.store = new vuex.Store({
    //保存
    modules: {
        loginModule, //持久化
        loadingModule,
        orderModule,
        hrModule,
        shopModule,
        authModule
    },
    plugins: [createPersistedState({
        key: 'staff',
        storage: window.sessionStorage,
        reducer(val) {
            return {
            loginModule: val.loginModule
          }
       }
    })]
})


export default store