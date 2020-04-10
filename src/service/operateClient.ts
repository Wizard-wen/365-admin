import {
    apiRequestUser,
    apiRequestFormConfig,
} from '../request/index'

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
        return Promise.all([
            apiRequestUser.getUser(id),
            apiRequestFormConfig.getWorkerFormConfig('edit'),
        ])
    },

}