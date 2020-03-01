


export interface api_common {
    // 获取证书列表
    getPaperSelection:{(type:string):Promise<any>},
    // 获取权限树
    getPermissionTree:{():Promise<any>},
    // 获取所有员工列表
    getManagerSelection:{():Promise<any>},
    // 获取某个部门的全部员工
    getDepartmentManagerSelection:{(department_id:string):Promise<any>},
    // 获取员工树形结构
    getManagerTree:{():Promise<any>},
    // 获取全部门店列表
    getStoreSelection:{():Promise<any>},
    // 获取某个门店员工列表
    getStoreManagerSelection:{(store_id:string):Promise<any>},
    // 获取当前未绑定门店员工
    getNotInStoreManagerSelection:{(store_id:string):Promise<any>},
    // 上传图片
    uploadImage:{(obj:object):Promise<any>},
}