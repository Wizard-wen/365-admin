/**
 * 客户列表 
 */
export default {
    /**
     * 获取用户列表
     */
    getUserList(){
        return axios.get(`./admin/user/getUserList`)
    },
    /**
     * 获取用户信息
     */
    getUser(id){
        return axios.get(`./admin/user/getUser?id=${id}`)
    }
}