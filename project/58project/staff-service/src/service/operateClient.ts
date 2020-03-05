import {apiRequestUser} from '../request/user/index'


/**
 * 客户列表 
 */
export const clientService = {
    getUserList():Promise<any>{
        return apiRequestUser.getUserList()
    },
    /**
     * 获取用户信息
     */
    getUser(id:string):Promise<any>{
        return apiRequestUser.getUser(id)
    }
}