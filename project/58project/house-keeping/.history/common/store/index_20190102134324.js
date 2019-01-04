
import Vue from 'vue'
import vuex from 'vuex'
/**
 * vuex-persistedstate vuex持久化
 */
import createPersistedState from 'vuex-persistedstate'

import {logininModules} from './loginModule.js'

Vue.use(vuex);

window.store = new vuex.Store({
    //保存
    modules: {
        logininModules,
    },
    plugins: [createPersistedState({
        paths: ['login'],
        key: config.namespace,
        // storage: window.sessionStorage 
    })]
})