 /**
 * 登陆模块
 */

import store from '../store'
import loginRequest from './request/loginRequest'

export default {
    //注册
    async register(phone, password,captcha){
        return loginRequest.register(phone, password,captcha);
    },
    //登录
    async login(phone, password){

        let login = await loginRequest.login(phone, password)
            .then(data =>{
                let _accessToken = data.data.accessToken;
                store.commit('login',{
                    access_token: _accessToken.access_token,
                    refresh_token: _accessToken.refresh_token
                })
                return data
            }).catch(err =>{
                throw err
            })
        return login
    },

    /**
     * 退出登录
     */
    logout(){
        store.commit('logout')
    }
}

