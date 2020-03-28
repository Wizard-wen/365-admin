
import {apiRequestPermission, apiRequestCommon} from '@/request/index'

import {
    editAccountForm,
    getAccountListForm,
} from '@/pages/auth/Iauth'

import {$utils} from '@/utils/index' 

export const accountService =  {
    /**
     * 获取管理员列表
     * @param tableOption
     */
    getManagerList(tableOption:getAccountListForm){

        let searUrl = $utils.changeObjectToPathString(tableOption)

        return apiRequestPermission.getManagerList(searUrl)
    },
    /**
     * 获取管理员信息
     * @param id 管理员id
     */
    getManager(id:number){
        return apiRequestPermission.getManager(id)
    },
    /**
     * 编辑管理员信息
     * @param editObj
     */
    editManager(editObj:editAccountForm){
        return apiRequestPermission.editManager(editObj)
    },
    /**
     * 物理删除管理员
     * @param id 管理员id
     */
    changeManagerType(id:number){
        return apiRequestPermission.changeManagerType(id)
    },
    /**
     * 获取所有的门店
     */
    getStoreSelection(){
        return apiRequestCommon.getStoreSelection()
    }
}