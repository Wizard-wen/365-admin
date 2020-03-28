


export interface api_user {
    // 获取用户列表
    getUserList:{(searchUrl:string):Promise<any>},
    // 获取用户信息
    getUser:{(id:number):Promise<any>},
}