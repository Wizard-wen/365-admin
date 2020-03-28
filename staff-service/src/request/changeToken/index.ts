import axios from 'axios'

export const refreshToken = (refresh_token:string):Promise<any> =>{
    return axios.post(`./admin/changeToken`,{
        refreshToken: refresh_token
    })
}