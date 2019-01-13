
import store from '../'

export const Login = {
    get isLogin(){
        
        return store.state.loginModule.isLogin
    },
    get token(){
        return store.state.loginModule.token
    },
    get user(){
        return store.state.loginModule.user
    },
    login(token){
        store.commit('login', token)
    },
    setUser(user){
        store.commit('setUser', user)
    },
    logout(){
        store.commit('logout')
    }
}

window.LoginState = Login