import {apiRequestUser} from '../request/user/index'

import {$utils} from '@/utils/index'
/**
 * 客户列表 
 */
export const clientService = {
    getUserList(queryForm:any):Promise<any>{
        let searchUrl = $utils.changeObjectToPathString(queryForm)
        return apiRequestUser.getUserList(searchUrl)
    },
    /**
     * 获取用户信息
     */
    getUser(id:number):Promise<any>{
        return apiRequestUser.getUser(id)
    }
}