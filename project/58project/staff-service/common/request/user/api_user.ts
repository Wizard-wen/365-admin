


export interface api_user {
    // 获取用户列表
    getUserList:{():Promise<any>},
    // 获取用户信息
    getUser:{(id:string):Promise<any>},
}