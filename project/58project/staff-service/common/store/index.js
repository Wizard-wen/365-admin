
import Vue from 'vue'
import vuex from 'vuex'
/**
 * vuex-persistedstate vuex持久化
 */
import createPersistedState from 'vuex-persistedstate'

import {loginModule} from './loginModule.js'

Vue.use(vuex);

window.store = new vuex.Store({
    //保存
    modules: {
        loginModule,
    },
    // plugins: [createPersistedState({
    //     paths: ['login'],
    //     key: config.namespace,
    // })]
})
export default store