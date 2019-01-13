
import Vue from 'vue'
import vuex from 'vuex'
/**
 * vuex-persistedstate vuex持久化
 */
import createPersistedState from 'vuex-persistedstate'

import {loginModule} from './login/loginModule.js'
import {authorityModule} from './authorityModule.js'

Vue.use(vuex);

window.store = new vuex.Store({
    //保存
    modules: {
        loginModule,
        authorityModule,
    },
    plugins: [createPersistedState({
        // paths: ['login'],
        key: 'staff',
        storage: window.sessionStorage,
    })]
})


export default store