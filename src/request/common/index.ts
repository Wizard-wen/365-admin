
import axios from 'axios'
import {api_common} from './api_common'



export const apiRequestCommon:api_common = {
    /**
     * 获取证书列表
     */
    getPaperSelection(type){
        if (type) {
            return axios.get(`./admin/common/getPaperSelection?type=${type}`)
        } else {
            return axios.get(`./admin/common/getPaperSelection`)
        }
    },
    /**
     * 获取权限树
     */
    getPermissionTree(){
        return axios.get(`./admin/common/getPermissionTree`)
    },
    /**
     * 获取全部门店列表
     */
    getStoreSelection(){
        return axios.get(`./admin/common/getStoreSelection`)
    },
    /**
     * 获取某个门店员工列表
     * @param store_id 门店id
     */
    getStoreManagerSelection(store_id:number){
        return axios.get(`./admin/common/getStoreManagerSelection?store_id=${store_id}`)
    },
    /**
     * 获取当前未绑定门店员工
     */
    getNotInStoreManagerSelection(){
        return axios.get(`./admin/common/getNotInStoreManagerSelection`)
    },
    /**
     * 获取所有员工列表
     */
    getManagerSelection(){
        return axios.get(`./admin/common/getManagerSelection`)
    },
    /**
     * 获取某个部门的全部员工
     */
    getDepartmentManagerSelection(department_id){
        return axios.get(`./admin/common/getDepartmentManagerSelection?department_id=${department_id}`)
    },
    /**
     * 获取员工树形结构
     */
    getManagerTree(){
        return axios.get('./admin/common/getManagerTree')
    },
    
    
    /**
     * 上传图片
     * @param formData 
     */
    uploadImage(formData){
        return axios.post('./admin/common/uploadImage',{
            ...formData
        })
    }
}