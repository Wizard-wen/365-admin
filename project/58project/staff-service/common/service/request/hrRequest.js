/**
 * 人力资源接口
 */
import axios from 'axios'

export default {
    /**
     * 获取员工列表
     * @param type 列表类别
     */
    getStaffList(type){
        let baseUrl = `./admin/staff/getStaffList`;
        if(type == 2){
            return axios.post(
                baseUrl,
                store.state.hrModule.returnList
            )
        }else if(type == 4){
            return axios.post(
                baseUrl,
                store.state.hrModule.newList
            )
        }
        

        return axios.post(
            baseUrl,
            store.state.hrModule.queryedList
        )
    },
    /**
     * 获取人员信息
     * @param id 员工id
     */
    getStaff(id){
        let baseUrl = `./admin/staff/getStaff`
        if(id){
            baseUrl += `?id=${id}`
        }
        return axios.get(baseUrl)
    },
    /**
     * 编辑员工
     * @param id | int | 非必填 | 员工id |
     * @param name |string|必填|姓名|
     * @param phone |string|必填|手机号|
     * @param age |int|必填|年龄|
     * @param address |string|必填|地址|
     * @param bank_card |string|必填|银行卡号|
     * @param version |int|必填|操作版本号|
     * @param labels |对象数组|非必填|能力标签|
     * @param papers |对象数组|非必填|证书|
     * @param skills |对象数组|非必填|技能|
     */
    editStaff(obj){
        obj = Object.assign({},obj)
        return axios.post(`./admin/staff/editStaff`,obj)
    },
    
    /**
     * 姓名查重
     */
    checkStaffName(id, name){
        return axios.post(`./admin/staff/checkStaffName`, {
            name: name,
            id: id
        })
    },






    /**
     *  改变订单状态
     */
    changeStaffStatus(id, version){
        return axios.post(`./admin/staff/changeStaffStatus`, {
            version: version,
            id: id
        })
    },





    /********************************通用模块**************************************88 */
    /**
     * 获取能力标签树
     */
    getAbilityTree(type){
        if (type) {
            return axios.get(`./admin/common/getLabelTree?type=${type}`)
        } else {
            return axios.get(`./admin/common/getLabelTree`)
        }
    },
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
     * 获取技能树
     */
    getSkillTree(type){
        if (type) {
            return axios.get(`./admin/common/getServiceTree?type=${type}`)
        } else {
            return axios.get(`./admin/common/getServiceTree`)
        }
    },
    /**
     * 省市区数据
     */
    getAreaTree(){
        return axios.get(`./admin/common/getAreaTree`)
    },
    /**
     * 人员信息配置
     */
    getFormConfig(){
        return axios.get('./admin/formConfig/getFormConfig')
    },
    /**
     * 标签信息配置
     */
    editFormConfig(obj){
        return axios.post('./admin/formConfig/editFormConfig',{
            ...obj
        })
    },


    /**
     * 单个服务人员添加回访
     */
    addReturnStaffSingle(id){
        return axios.post(`./admin/staff/addReturnStaffSingle`,{id: id})
    },
    /**
     * 多个回访人员到回访列表
     */
    addReturnStaff(obj){
        return axios.post(`./admin/staff/addReturnStaff`,{...obj})
    },
    /**
     * 获取可回访人员数量
     */
    getReturnStaff(obj){
        return axios.post(`./admin/staff/getReturnStaff`,{...obj})
    },
    /**
     * 恢复全部回访人员
     */
    removeReturnStaff(){
        return axios.post(`./admin/staff/removeReturnStaff`,{})
    },
    /**
     * 恢复单个回访人员
     */
    removeReturnStaffSingle(type,id){
        if(type == "list"){
            return axios.post(`./admin/staff/removeReturnStaffSingle`,{
                from: "list",
                id:id,
            })
        } else {

        }
        
    },

    /**
     * 删除申请添加服务人员
     */
    deleteApplyStaff(id){
        return axios.post(`./admin/staff/deleteApplyStaff`,{
            id:id,
        })
    },




    /***************************技能分类模块*************************************/
    /**
     * 技能分类接口
     */
    getCategoryList(tableOption){
        let baseUrl = `./admin/service/getCategoryList?pageNumber=${tableOption.pageNumber}&page=${tableOption.currentPage}`
        if(tableOption.searchSelect.length){
            tableOption.searchSelect.forEach((item, index) => {
                baseUrl += `&${item.key}=${item[item.key]}`
            });
        }
        return axios.get(baseUrl)
    },
    /**
     * 请求某一具体技能接口
     * @param id 技能的id
     */
    getCategory(id){
        return axios.get(`./admin/service/getCategory?id=${id}`)
    },
    /**
     * 编辑技能接口
     */
    editCategory(obj){

        obj = Object.assign({},obj)

        return axios.post(`./admin/service/editCategory`,obj)

    },







    /*********************************能力标签模块*************************************************/
    /**
     * 能力标签列表接口
     */
    getAbilityList(tableOption){
        let baseUrl = `./admin/ability/getAbilityList?pageNumber=${tableOption.pageNumber}&page=${tableOption.currentPage}`
        if(tableOption.searchSelect.length){
            tableOption.searchSelect.forEach((item, index) => {
                baseUrl += `&${item.key}=${item[item.key]}`
            });
        }
        return axios.get(baseUrl)
    },
    /**
     * 请求某一具体能力标签接口
     * @param id 能力标签的id
     */
    getAbility(id){
        return axios.get(`./admin/ability/getAbility?id=${id}`)
    },
    /**
     * 编辑能力标签接口
     */
    editAbility(obj){

        obj = Object.assign({},obj)

        return axios.post(`./admin/ability/editAbility`,obj)

    },

    /*********************************证书模块*************************************************/
    /**
     * 证书列表接口
     */
    getPaperList(tableOption){
        let baseUrl = `./admin/paper/getPaperList?pageNumber=${tableOption.pageNumber}&page=${tableOption.currentPage}`
        if(tableOption.searchSelect.length){
            tableOption.searchSelect.forEach((item, index) => {
                baseUrl += `&${item.key}=${item[item.key]}`
            });
        }
        return axios.get(baseUrl)
    },
    /**
     * 请求某一具体证书接口
     * @param id 证书的id
     */
    getPaper(id){
        return axios.get(`./admin/paper/getPaper?id=${id}`)
    },
    /**
     * 编辑证书接口
     */
    editPaper(obj){

        obj = Object.assign({},obj)

        return axios.post(`./admin/paper/editPaper`,obj)

    },

}
