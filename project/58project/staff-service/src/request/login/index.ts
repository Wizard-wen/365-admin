

import axios from 'axios'



export const apiLogin ={
    login(username:string, password:string){
        return axios.post(`./admin/login`,{
            account: username,
            password: password
        })
    },
    /**
     * 刷新token
     * @param refresh_token
     */
    refreshToken(refresh_token:string){
        return axios.post(`./admin/changeToken`,{
            refreshToken: refresh_token
        })
    }
} 