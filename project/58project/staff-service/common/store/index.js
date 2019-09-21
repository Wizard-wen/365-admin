
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
import {storeModule} from './storeModule.js' //门店
import {authModule} from './authModule.js' 

Vue.use(vuex);

window.store = new vuex.Store({
    //保存
    modules: {
        loginModule, //持久化
        loadingModule,
        saleModule,
        operateModule,
        storeModule,
        authModule
    },
    plugins: [createPersistedState({
        key: 'worker',
        storage: window.sessionStorage,
        reducer(val) {
            return {
            loginModule: val.loginModule
          }
       }
    })]
})


export default store