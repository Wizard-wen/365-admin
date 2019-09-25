import axios from 'axios'

export default {
    /**
     * 获取个人信息
     */
    getPersonal(id, get_for){
        return axios.get(`./admin/personal/getPersonal?id=${id}&get_for=${get_for}`)
    },
    /**
     * 编辑个人信息
     * @param paramObj
     */
    editPersonal(paramObj){
        return axios.post(`./admin/personal/editPersonal`,paramObj)
    },
    /**
     * 更改密码
     * @param paramObj
     */
    changePassword(paramObj){
        return axios.post(`./admin/personal/changePassword`,paramObj)
    }
}