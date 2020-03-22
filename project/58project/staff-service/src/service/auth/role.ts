
import {apiRequestPermission} from '@/request/index'
import {$utils} from '@/utils/index' 
import {
    editRoleForm,
    editRolePermissionForm,
    getRoleListForm,
} from '@/pages/auth/Iauth'

export const roleService = {
        /**
     * 获取角色列表
     */
    getRoleList(tableOption:getRoleListForm){
        let searchUrl = $utils.changeObjectToPathString(tableOption)

        return apiRequestPermission.getRoleList(searchUrl)
    },
    /**
     * 获取角色信息
     * @param id 角色id
     */
    getRole(id:number){
        return apiRequestPermission.getRole(id)
    },
    /**
     * 编辑角色信息
     * @param editRoleForm
     */
    editRole(editRoleForm:editRoleForm){
        return apiRequestPermission.editRole(editRoleForm)
    },
    /**
     * 物理删除角色
     * @param id 角色id
     */
    deleteRole(id:number){
        return apiRequestPermission.deleteRole(id)
    },
     /**
     * 获取角色权限信息
     * @param id 角色id
     */
    getRolePermission(id:number){
        return apiRequestPermission.getRolePermission(id).then(data =>{
            let permissionList = data.data.permissionList
            // 包装数据
            let rolePermissionIds = this.getSelectedIds(permissionList)
            return {
                permissionList: permissionList,
                rolePermissionIds: rolePermissionIds,
            }
        })
    },
    /**
     * 编辑角色权限信息
     * @param id 角色id
     * @param permission 角色绑定权限id组
     */
    editRolePermission(editRolePermissionForm:editRolePermissionForm){
        return apiRequestPermission.editRolePermission(editRolePermissionForm)
    },
    /**
     * 拿到所有处于选中状态的叶节点
     * @param arrList 原始树形结构数组
     */
    getSelectedIds(arrList:Array<any>){

        let ids:Array<number> = []; //定义一个用来保存所有 处于选中状态 的 叶节点 的 数组
        /**
         * 递归地，将所有的叶节点is_on属性为true的节点存入数组
         */
        function findIds(arr:Array<any>){
            arr.forEach((item, index) =>{
                if(item.children){
                    findIds(item.children)
                } else {
                    if(item.is_on){
                        ids.push(item.id)
                    }
                } 
            })
        }
        findIds(arrList)
        return ids
    }
}