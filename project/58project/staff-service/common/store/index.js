
import Vue from 'vue'
import vuex from 'vuex'
/**
 * vuex-persistedstate vuex持久化
 */
import createPersistedState from 'vuex-persistedstate'

import {loginModule} from './loginModule.js'
import {loadingModule} from './loadingModule.js'
import {saleModule} from './saleModule.js'
import {operateModule} from './operateModule.js'
import {shopModule} from './shopModule.js' //门店
import {authModule} from './authModule.js' 

Vue.use(vuex);

window.store = new vuex.Store({
    //保存
    modules: {
        loginModule, //持久化
        loadingModule,
        saleModule,
        operateModule,
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