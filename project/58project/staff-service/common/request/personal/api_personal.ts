


export interface api_personal{
    // 获取个人信息
    getPersonal:{(id:string, get_for:string):Promise<any>},
    // 编辑个人信息s
    editPersonal:{(paramObj:object):Promise<any>},
    // 更改密码
    changePassword:{(paramObj:object):Promise<any>},
}