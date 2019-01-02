
import Vue from 'vue'
import vuex from 'vuex'
/**
 * vuex-persistedstate vuex持久化
 */
import createPersistedState from 'vuex-persistedstate'


Vue.use(vuex);

window.store = new vuex.Store({
    //保存
    modules: {
        ...VuexModule,
        topology: topologyStoreModule,
    },
    plugins: [createPersistedState({
        paths: ['login'],
        key: config.namespace,
        // storage: window.sessionStorage 
    })]
})