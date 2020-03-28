import axios from 'axios'

import {api_user} from './api_user'

export const apiRequestUser:api_user = {
    /**
     * 获取用户列表
     */
    getUserList(searchUrl){
        return axios.get(`./admin/user/getUserList${searchUrl}`)
    },
    /**
     * 获取用户信息
     */
    getUser(id){
        return axios.get(`./admin/user/getUser?id=${id}`)
    }
}