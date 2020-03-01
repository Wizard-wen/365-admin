



export interface api_permission {
    // getMenu:{():Promise<any>},


    getManagerList:{(tableOption:tableOption):Promise<any>},
    getManager:{(id:string):Promise<any>},
    editManager:{(editObj:object):Promise<any>},
    changeManagerType:{(id:string):Promise<any>},
    
    
    
    
    getRoleList:{(tableOption:tableOption):Promise<any>},
    getRole:{(id:string):Promise<any>},
    editRole:{(name:string, id:string):Promise<any>},
    deleteRole:{(id:string):Promise<any>},
    getRolePermission:{(id:string):Promise<any>},
    editRolePermission:{(id:string,permission:string):Promise<any>},



    getPermissionList:{(tableOption:tableOption):Promise<any>},
    getPermission:{(id:string):Promise<any>},
    editPermission:{(editObj:object):Promise<any>},
    deletePermission:{(id:string):Promise<any>},
}

interface tableOption{
    pageNumber?:string,
    searchSelect:Array<searchSelsctItem>,
    currentPage?:string,
}
interface searchSelsctItem{
    key:'searchkey',
    searchkey:string,
}