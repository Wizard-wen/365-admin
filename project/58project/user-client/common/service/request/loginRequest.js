/**
 * 登陆相关接口
 */
import axios from 'axios'

export default {
    /**
     * 注册
     * @param {phone} 手机号
     * @param {password} 密码
     * @param {captcha} 验证码
     */
    register(phone, password,captcha){
        return axios.post(`/user/register`,{
            phone: phone,
            password: password,
            captcha: captcha
        })
    },
    /**
     * 登录
     * @param {phone} 手机号
     * @param {password} 密码
     */
    login(phone, password){
        return axios.post(`/user/login`,{
            phone: phone,
            password: password,
        })
    },
    /**
     * 刷新token
     * @param {token}
     */
    changeToken(token){
        return axios.post(`/user/changeToken`, {
            refreshToken: token
        })
    }

}
