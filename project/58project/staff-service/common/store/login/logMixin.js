
/**
 * 备注： 
 * this.$root.$options
 * this.$options
 * 用于当前 Vue 实例的初始化选项。需要在选项中包含自定义属性时会有用处：
 * 
 */



export function installLogin(Vue){
    //全局注入
    Vue.mixin({
        beforeCreate(){
            if(!cacheStore && this.$root.$options.store)
                cacheStore = this.$root.$options.store
        },
        computed: mapState({
            // 箭头函数可使代码更简练
            $Login: function(state={}) {
                return {
                    ...state.login,
                    login: (token)=>{
                        this.$store.commit('login', token)
                    },
                    setUser: (user)=>{
                        this.$store.commit('setUser', user)
                    },
                    logout: ()=>{
                        this.$store.commit('logout')
                    }
                }
            },
        })
    })
}