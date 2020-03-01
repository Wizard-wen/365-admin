

import axios from 'axios'



export const login = (username:string, password:string):Promise<any> =>{
    return axios.post(`./admin/login`,{
        account: username,
        password: password
    })
}