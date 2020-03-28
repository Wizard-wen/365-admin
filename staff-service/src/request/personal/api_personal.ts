import {
    passwordChangeForm,
    personal_infoForm,
} from '@/pages/myCenter/ImyCenter'



export interface api_personal{
    // 获取个人信息
    getPersonal:{(id:number, get_for:string):Promise<any>},
    // 编辑个人信息s
    editPersonal:{(paramObj:personal_infoForm):Promise<any>},
    // 更改密码
    changePassword:{(paramObj:passwordChangeForm):Promise<any>},
}