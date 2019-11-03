/**
 * 登陆相关接口
 */
import axios from 'axios'

export default {
    /**
     * 登录
     * des 获取token 菜单等
     * @param {username} 用户名
     * @param {password} 密码
     */
    login(username, password){
        return axios.post(`./admin/login`,{
            account: username,
            password: password
        })
    },
    /**
     * 刷新token
     * @param refresh_token
     */
    refreshToken(refresh_token){
        return axios.post(`./admin/changeToken`,{
            refreshToken: refresh_token
        })
    }
}
