
import {apiRequestPersonal} from '../request/personal/index'
import {
    passwordChange,
    personal_info,
} from '../pages/myCenter/ImyCenter'
export default {
    /**
     * 获取个人信息
     * @param id 当前用户id
     * @param get_for 基本信息、个人信息
     */
    getPersonal(id:string, get_for:string):Promise<any>{
        return apiRequestPersonal.getPersonal(id, get_for)
    },
    /**
     * 编辑个人信息
     * @param paramObj
     */
    editPersonal(paramObj:personal_info):Promise<any>{
        return apiRequestPersonal.editPersonal(paramObj)
    },
    /**
     * 更改密码
     * @param paramObj
     */
    changePassword(paramObj:passwordChange):Promise<any>{
        return apiRequestPersonal.changePassword(paramObj)
    }
}