
import axios from 'axios'
import {api_formConfig} from './api_formConfig'

export const apiRequestFormConfig:api_formConfig = {
        /**
     * 请求服务人员标签配置数据
     * @param type config
     */
    getWorkerFormConfig(type){
        return axios.get(`./admin/formConfig/getWorkerFormConfig?get_for=${type}`)
    },
    /**
     * 标签信息配置
     */
    editWorkerFormConfig(obj){
        return axios.post('./admin/formConfig/editWorkerFormConfig',{
            ...obj,
        })
    },
    /**
     * 请求订单标签配置数据
     */
    getOrderFormConfig(){
        return axios.get(`./admin/formConfig/getOrderFormConfig`)
    },
    /**
     * 请求订单申请标签配置数据
     */
    getApplyFormConfig(){
        return axios.get(`./admin/formConfig/getApplyFormConfig`)
    },
}