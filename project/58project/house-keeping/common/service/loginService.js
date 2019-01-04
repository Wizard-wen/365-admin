/**
 * 登陆模块
 */
import store from '../store/index.js'
 export default {
     /**
      * 
      */
    loginFn(){
        return Promise.resolve(true).then((data) =>{
            store.state.loginModule.isLogin = data
        })
    },
    /**
     * 
     */
    logoutFn(){

    }
 }