/**
 * 权限接口
 */

 import axios from 'axios'

export default {

    /****************************管理员模块**********************************/
    /**
     * 获取管理员列表
     * @param page 页码
     * @param name 用户名
     * @param tableOption 表格配置项
     * @param tableOption.currentPage 当前页
     * @param tableOption.searchSelect Array 页面筛选项
     * [{key: 'searchkey', searchkey: ''}]
     */
    getManagerList(tableOption){
        let baseUrl = `./api/admin/permission/getManagerList?pageNumber=${tableOption.pageNumber}`
        if(tableOption.searchSelect.length){
            tableOption.searchSelect.forEach((item, index) => {
                baseUrl += `&${item.key}=${item[item.key]}`
            });
            baseUrl += `&page=1`
        } else {
            baseUrl += `&page=${tableOption.currentPage}`
        }
        
        return axios.get(baseUrl)
    },
    /**
     * 获取管理员角色绑定信息
     * @param id 管理员id
     */
    getManagerRole(id){
        return axios.get(`./api/admin/permission/getManagerRole?id=${id}`)
    },
    /**
     * 分配绑定管理员角色
     * @param id 角色id
     * @param roleIds 角色id数组
     */
    editManagerRole(id, roleIds){
        return axios.post(`./api/admin/permission/editManagerRole`,{
            id: id,
            roleIds: roleIds,
        })
    },
    /**
     * 获取管理员信息
     * @param id 管理员id
     */
    getManager(id){
        return axios.get(`./api/admin/permission/getManager?id=${id}`)
    },
    /**
     * 编辑管理员信息
     * @param editObj
     * | id | int | 必填 | 管理员id |
     * | name | string | 必填 | 角色名 |
     * | account | string | 必填 | 角色账号 |
     * | password | string | 必填 | 密码 |
     * | repassword | string | 必填 | 确认密码 |
     */
    editManager(editObj){
        return axios.post(`./api/admin/permission/editManager`,Object.assign({},editObj))
    },
    /**
     * 物理删除管理员
     * @param id 管理员id
     */
    deleteManager(id){
        return axios.post(`./api/admin/permission/deleteManager`,{
            id: id
        })
    },

/********************************角色模块**************************************/

    /**
     * 获取角色列表
     */
    getRoleList(tableOption){
        let baseUrl = `./api/admin/permission/getRoleList?pageNumber=${tableOption.pageNumber}`
        // if(tableOption.searchSelect.length){
        //     tableOption.searchSelect.forEach((item, index) => {
        //         baseUrl += `&${item.key}=${item[item.key]}`
        //     });
        // }
        if(tableOption.searchSelect.length){
            tableOption.searchSelect.forEach((item, index) => {
                baseUrl += `&${item.key}=${item[item.key]}`
            });
            baseUrl += `&page=1`
        } else {
            baseUrl += `&page=${tableOption.currentPage}`
        }
        return axios.get(baseUrl)
    },
    /**
     * 获取角色信息
     * @param id 角色id
     */
    getRole(id){
        return axios.get(`./api/admin/permission/getRole?id=${id}`)
    },
    /**
     * 编辑角色信息
     * @param id 角色id
     * @param name 角色名
     */
    editRole(name, id=''){
        if(id == ''){
            return axios.post(`./api/admin/permission/editRole`,{
                name: name
            })
        } else {
            return axios.post(`./api/admin/permission/editRole`,{
                id: id,
                name: name
            })
        }
        
    },
    /**
     * 物理删除角色
     * @param id 角色id
     */
    deleteRole(id){
        return axios.post(`./api/admin/permission/deleteRole`,{
            id: id
        })
    },
    /**
     * 获取角色权限信息
     * @param id 角色id
     */
    getRolePermission(id){
        return axios.get(`./api/admin/permission/getRolePermission?id=${id}`)
    },
    /**
     * 编辑角色权限信息
     * @param id 角色id
     * @param permission 角色绑定权限id组
     */
    editRolePermission(id, permission){
        return axios.post(`./api/admin/permission/editRolePermission`,{
            id: id,
            permissionIds: permission
        })
    },

/********************************权限模块**************************************/
    /**
     * 获取权限列表
     */
    getPermissionList(tableOption){
        let baseUrl = `./api/admin/permission/getPermissionList?pageNumber=${tableOption.pageNumber}`
        // if(tableOption.searchSelect.length){
        //     tableOption.searchSelect.forEach((item, index) => {
        //         baseUrl += `&${item.key}=${item[item.key]}`
        //     });
        // }
        if(tableOption.searchSelect.length){
            tableOption.searchSelect.forEach((item, index) => {
                baseUrl += `&${item.key}=${item[item.key]}`
            });
            baseUrl += `&page=1`
        } else {
            baseUrl += `&page=${tableOption.currentPage}`
        }
        return axios.get(baseUrl)
    },
    /**
     * 获取权限信息
     * @param id 权限id
     */
    getPermission(id){
        return axios.get(`./api/admin/permission/getPermission?id=${id}`)
    },
    /**
     * 编辑权限信息
     * @param editObj 
     * | id | int | 必填 | 权限id |
     * | route | string | 必填 | 权限路由 |
     * | name | string | 必填 |  权限名字 |
     * | description | string | 必填 |  权限描述 |
     * | icon | string | 必填 |  权限图标 |
     * | sort_order | int | 必填 | 权限排序顺序 |
     * | parent_id | int | 必填 |  权限父级id |
     * | is_api | int | 必填 |  是否为api路由 |
     * | is_display | int | 必填 |  是否展示 |
     */
    editPermission(editObj){
        return axios.post(`./api/admin/permission/editPermission`,Object.assign({},editObj))
    },
    /**
     * 物理删除权限
     * @param id 权限id
     */
    deletePermission(id){
        return axios.post(`./api/admin/permission/deletePermission`,{
            id: id
        })
    }
}