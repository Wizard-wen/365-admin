
import myCenterRequest from './request/myCenterRequest.js'

export default {
    /**
     * 获取个人信息
     * @param id 当前用户id
     * @param get_for 基本信息、个人信息
     */
    getPersonal(id, get_for){
        return myCenterRequest.getPersonal(id, get_for)
    },
    /**
     * 编辑个人信息
     * @param paramObj
     */
    editPersonal(paramObj){
        return myCenterRequest.editPersonal(paramObj)
    },
    /**
     * 更改密码
     * @param paramObj
     */
    changePassword(paramObj){
        return myCenterRequest.changePassword(paramObj)
    }
}