
import {
    apiRequestPersonal,
    apiRequestCommon,
} from '@/request/index'

import {
    passwordChangeForm,
    personal_infoForm,
} from '@/pages/myCenter/ImyCenter'


export const myCenterService = {
    /**
     * 获取个人信息
     * @param id 当前用户id
     * @param get_for 基本信息、个人信息
     */
    getPersonal(id:number, get_for:string):Promise<any>{
        return apiRequestPersonal.getPersonal(id, get_for)
    },
    /**
     * 编辑个人信息
     * @param paramObj
     */
    editPersonal(paramObj:personal_infoForm):Promise<any>{
        return apiRequestPersonal.editPersonal(paramObj)
    },
    /**
     * 更改密码
     * @param paramObj
     */
    changePassword(paramObj:passwordChangeForm):Promise<any>{
        return apiRequestPersonal.changePassword(paramObj)
    },
    /**
     * 获取门店成员
     * @param store_id 
     */
    getStoreManagerSelection(store_id:number){
        return apiRequestCommon.getStoreManagerSelection(store_id)
    },
    /**
     * 获取部门成员
     * @param department_id 
     */
    getDepartmentManagerSelection(department_id:number){
        return apiRequestCommon.getDepartmentManagerSelection(department_id)
    }
}